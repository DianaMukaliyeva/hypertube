import fs from 'fs';
import torrentStream from 'torrent-stream';
import ffmpeg from 'fluent-ffmpeg';

import movieListUtils from './movieAPIUtilities.js';
import Movie from '../models/Movie.js';

const saveFilePath = async ({ imdbCode, magnet }, serverLocation, size) => {
  const movie = await Movie.findOneAndUpdate({ imdbCode }, { serverLocation, size });
  if (movie === null) {
    const newMovie = new Movie({
      imdbCode,
      serverLocation,
      magnet,
      size,
    });
    await newMovie.save();
  }
};

const startFileStream = (req, res) => {
  let notLoaded = false;
  const filePath = `./movies/${req.params.imdbCode}/${req.serverLocation}`;
  const isMp4 = filePath.endsWith('mp4');
  const fileSize = fs.statSync(filePath).size;
  const { range } = req.headers;
  const CHUNK_SIZE = 20e+6; // 20 Mb
  let start = range ? Number(range.replace(/\D/g, '')) : 0;
  if (start > fileSize - 1) {
    notLoaded = true;
    start = 0;
  }
  const end = isMp4 ? Math.min(start + CHUNK_SIZE, fileSize - 1) : fileSize - 1;
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${req.movieSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Type': isMp4 ? 'video/mp4' : 'video/webm',
  };
  if (notLoaded) {
    res.writeHead(200, headers);
  } else {
    res.writeHead(206, headers);
  }
  const readStream = fs.createReadStream(filePath, { start, end });
  if (isMp4) readStream.pipe(res);
  else {
    ffmpeg(readStream).format('webm').on('error', () => {}).pipe(res);
  }
};

const getMagnet = async (imdbCode) => {
  const torrentData = (await movieListUtils.fetchTorrentData(imdbCode)).movies[0];
  // eslint-disable-next-line
  const { hash } = torrentData.torrents.reduce((curr, prev) => prev.size_bytes < curr.size_bytes ? prev : curr,);
  return `magnet:?xt=urn:btih:${hash}&dn=${torrentData.title_long.split(' ').join('+')}`;
};

const setMovieAsCompleted = async (imdbCode) => {
  await Movie.findOneAndUpdate(
    { imdbCode },
    { downloadComplete: true },
    { new: true },
  );
};

const downloadMovie = async (movie, downloadCache) => new Promise((resolve) => {
  let filePath;
  let size = 0;
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
  engine.on('torrent', () => {
    engine.files.forEach((file) => {
      if (file.name.endsWith('.mp4') || file.name.endsWith('.mkv')) {
        file.select();
        filePath = file.path;
        size = file.length;
      } else {
        file.deselect();
      }
    });
    if (filePath && movie.serverLocation !== filePath) saveFilePath(movie, filePath, size);
  });

  engine.on('download', () => {
    const moviePath = `./movies/${movie.imdbCode}/${filePath}`;
    if (
      fs.existsSync(moviePath)
        && !downloadCache.has(movie.imdbCode)
    ) {
      if (fs.statSync(moviePath).size / (1024 * 1024) > 20) {
        downloadCache.set(movie.imdbCode, 'downloading');
        resolve();
      }
    }
  });

  engine.on('idle', () => {
    setMovieAsCompleted(movie.imdbCode);
    downloadCache.del(movie.imdbCode);
    engine.destroy();
  });
});

export default {
  downloadMovie,
  startFileStream,
  getMagnet,
};
