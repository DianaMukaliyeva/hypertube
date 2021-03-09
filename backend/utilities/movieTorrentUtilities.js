import torrentStream from 'torrent-stream';
import fs from 'fs';
import movieListUtils from './movieAPIUtilities.js';
import Movie from '../models/Movie.js';

const startFileStream = async (req, res, next) => {
  // should check for file format first and convert to .mp4
  const filePath = `./movies/${req.params.imdbCode}/${req.serverLocation}`;
  const fileSize = fs.statSync(filePath).size;
  const { range } = req.headers;
  // const CHUNK_SIZE = 5e+6; // we have option to chunk the response into smaller chunks
  const start = range ? Number(range.replace(/\D/g, '')) : 0;
  const end = fileSize - 1;
  const contentLength = end - start + 1;

  const headers = {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4',
  };
  res.writeHead(206, headers);
  const readStream = await fs.createReadStream(filePath, { start, end });
  readStream.pipe(res);
};

const downloadMovie = async (req, res, next) => {
  // download should prioritize the start time from the request
  // and start the filestream from that byte
  let filePath;
  const { imdbCode } = req.params;
  const torrentData = await movieListUtils.fetchTorrentData(imdbCode);
  // eslint-disable-next-line camelcase
  const { hash, size_bytes } = torrentData.torrents.reduce((curr, prev) => (
    (prev.size_bytes < curr.size_bytes ? prev : curr)));

  const magnet = `magnet:?xt=urn:btih:${hash}&dn=${torrentData.title_long.split(' ').join('+')}`;
  const engine = torrentStream(magnet, {
    trackers: [
      'udp://open.demonii.com:1337/announce',
      'udp://tracker.openbittorrent.com:80',
      'udp://tracker.coppersurfer.tk:6969',
      'udp://glotorrents.pw:6969/announce',
      'udp://tracker.opentrackr.org:1337/announce',
      'udp://torrent.gresille.org:80/announce',
      'udp://p4p.arenabg.com:1337',
      'udp://tracker.leechers-paradise.org:6969',
    ],
    path: `./movies/${imdbCode}`,
  });
  engine.on('ready', () => {
    engine.files.forEach((file) => {
      if (file.name.endsWith('.mp4')) {
        file.select();
        filePath = file.path;
      } else {
        file.deselect();
      }
    });
  });
  engine.on('download', () => {
    console.log('i am downloading!', engine.files.length);
    req.serverLocation = filePath;
    if (fs.existsSync(`./movies/${req.params.imdbCode}/${req.serverLocation}`)) startFileStream(req, res, next);
  });

  engine.on('idle', async () => {
    console.log('i am ready!');
    const movie = await Movie.findOneAndUpdate({ imdbCode }, { serverLocation: filePath });
    if (movie === null) {
      const newMovie = new Movie({
        imdbCode,
        serverLocation: filePath,
      });
      await newMovie.save();
    }
  });
};

export default {
  downloadMovie,
  startFileStream,
};
