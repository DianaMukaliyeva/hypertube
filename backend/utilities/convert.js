import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { workerData, parentPort } from 'worker_threads';

const { imdbCode, serverLocation } = workerData;
const moviePath = `./movies/${imdbCode}/${serverLocation}`;
const savePath = path.parse(serverLocation);
const fileLocation = `${savePath.dir}/${savePath.name}.mp4`;
ffmpeg(moviePath)
  .format('mp4')
  .on('end', async () => {
    parentPort.postMessage(fileLocation);
  })
  .videoBitrate(1000)
  .on('error', () => {})
  .on('progress', (progress) => {
    console.log(`Processing: ${progress.percent}% done`);
  })
  .renice(0)
  .save(`./movies/${imdbCode}/${fileLocation}`);
