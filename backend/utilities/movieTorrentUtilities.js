import torrentStream from 'torrent-stream';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
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
  const filePath = `./movies/${req.params.imdbCode}/${req.serverLocation}`;
  const isMp4 = filePath.endsWith('mp4');
  const fileSize = fs.statSync(filePath).size;
  const { range } = req.headers;
  const CHUNK_SIZE = 20e+6; // 20 Mb
  const start = range ? Number(range.replace(/\D/g, '')) : 0;
  const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
  const contentLength = end - start + 1;

  const headers = {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': isMp4 ? 'video/mp4' : 'video/webm',
  };
  res.writeHead(206, headers);
  const readStream = await fs.createReadStream(filePath, { start, end });
  if (isMp4) readStream.pipe(res);
  else {
    ffmpeg(readStream)
      .format('webm')
      .on('error', () => { })
      .pipe(res);
  }
};

const getMagnet = async (imdbCode) => {
  const torrentData = (await movieListUtils.fetchTorrentData(imdbCode)).movies[0];
  // eslint-disable-next-line
  const { hash } = torrentData.torrents.reduce((curr, prev) => (prev.size_bytes < curr.size_bytes ? prev : curr));
  return `magnet:?xt=urn:btih:${hash}&dn=${torrentData.title_long.split(' ').join('+')}`;
};

// not in use as it is way too slow
// const convertMovieToMp4 = (movie) => {
//   const { imdbCode } = movie;
//   const moviePath = `./movies/${imdbCode}/${movie.serverLocation}`;
//   const savePath = path.parse(movie.serverLocation);
//   const fileLocation = `${savePath.dir}/${savePath.name}.mp4`;
//   ffmpeg(moviePath)
//     .format('mp4')
//     .on('end', async () => {
//       Movie.findOneAndUpdate({ imdbCode }, { serverLocation: fileLocation });
//     })
//     .on('error', () => {})
//     .save(`./movies/${imdbCode}/${fileLocation}`);
// };

const setMovieAsCompleted = async (imdbCode) => {
  await Movie.findOneAndUpdate({ imdbCode }, { downloadComplete: true },
    { new: true });
  // we could convert the completed file in the background but it is very cpu intensive
  // if (movie.serverLocation.endsWith('.mkv')) convertMovieToMp4(movie);
};

const downloadMovie = async (movie) => new Promise((resolve) => {
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
  engine.on('torrent', () => {
    engine.files.forEach((file) => {
      if (file.name.endsWith('.mp4') || file.name.endsWith('.mkv')) {
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
    setMovieAsCompleted(movie.imdbCode);
  });
});

export default {
  downloadMovie,
  startFileStream,
  getMagnet,
};
