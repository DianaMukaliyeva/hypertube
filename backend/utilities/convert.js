import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { workerData, parentPort } from 'worker_threads';
import Movie from '../models/Movie.js';

const { imdbCode, serverLocation } = workerData;
const moviePath = `./movies/${imdbCode}/${serverLocation}`;
// eslint-disable-next-line
    const savePath = path.parse(serverLocation);
const fileLocation = `${savePath.dir}/${savePath.name}.mp4`;
ffmpeg(moviePath)
  .format('mp4')
  .on('end', async () => {
    Movie.findOneAndUpdate({ imdbCode }, { serverLocation: fileLocation });
    parentPort.postMessage('conversion done');
  })
  .on('error', () => {})
  .save(`./movies/${imdbCode}/${fileLocation}`);
