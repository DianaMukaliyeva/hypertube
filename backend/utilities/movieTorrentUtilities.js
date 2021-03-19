import torrentStream from 'torrent-stream';
import fs from 'fs';
import movieListUtils from './movieAPIUtilities.js';
import Movie from '../models/Movie.js';

const saveFilePath = async ({ imdbCode, magnet }, filePath) => {
  const movie = await Movie.findOneAndUpdate({ imdbCode }, { serverLocation: filePath });
  if (movie === null) {
    const newMovie = new Movie({
      imdbCode,
      serverLocation: filePath,
      magnet,
    });
    await newMovie.save();
  }
};

const startFileStream = async (req, res) => {
  // todo: per subject should check for file format first and convert to .mp4
  const filePath = `./movies/${req.params.imdbCode}/${req.serverLocation}`;
  const fileSize = fs.statSync(filePath).size;
  const { range } = req.headers;
  const CHUNK_SIZE = 5e+6; // 5 Mb
  const start = range ? Number(range.replace(/\D/g, '')) : 0;
  const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
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

const getMagnet = async (imdbCode) => {
  const torrentData = (await movieListUtils.fetchTorrentData(imdbCode)).movies[0];
  // eslint-disable-next-line
  const { hash } = torrentData.torrents.reduce((curr, prev) => (prev.size_bytes < curr.size_bytes ? prev : curr));
  return `magnet:?xt=urn:btih:${hash}&dn=${torrentData.title_long.split(' ').join('+')}`;
};

const downloadMovie = async (movie) => new Promise((resolve) => {
  // download should prioritize the start time from the request
  // and start the filestream from that byte
  let filePath;
  const engine = torrentStream(movie.magnet, {
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
    path: `./movies/${movie.imdbCode}`,
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
    if (filePath && movie.serverLocation !== filePath) saveFilePath(movie, filePath);
    // console.log('engine ready on movie', movie.imdbCode);
  });

  engine.on('download', () => {
    const moviePath = `./movies/${movie.imdbCode}/${filePath}`;
    if (fs.existsSync(moviePath)) {
      if (fs.statSync(moviePath).size / (1024 * 1024) > 20) {
        // console.log('resolved', fs.statSync(moviePath).size / (1024 * 1024), movie.imdbCode);
        resolve();
      }
    }
    // console.log('i am downloading movie', movie.imdbCode, p);
  });

  engine.on('idle', () => {
    // console.log('movie', movie.imdbCode, 'complete');
    Movie.findOneAndUpdate({ imdbCode: movie.imdbCode }, { downloadComplete: true });
  });
});

export default {
  downloadMovie,
  startFileStream,
  getMagnet,
};
