import torrentStream from 'torrent-stream';
import fs from 'fs';
import movieListUtils from './movieAPIUtilities.js';
import Movie from '../models/Movie.js';

const downloadMovie = async (req, res, next) => {
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
  engine.on('download', () => console.log('i am downloading!', engine.files.length));

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

const startFileStream = async (req, res, next) => {
  const readStream = await fs.createReadStream(`./movies/${req.params.imdbCode}/${req.serverLocation}`);
  readStream.on('open', () => {
    // pipe should be here
    console.log('filestream open');
  });
};

export default {
  downloadMovie,
  startFileStream,
};
