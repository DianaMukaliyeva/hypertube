import { CronJob } from 'cron';
import fs from 'fs';

import Movie from '../models/Movie.js';

const removeMovie = async (movie) => {
  const subtitlesPath = `./subtitles/${movie.imdbCode}`;
  // TO DO check serverLocation is working or not
  const moviePath = movie.serverLocation || `./movies/${movie.imdbCode}`;
  if (fs.existsSync(moviePath)) {
    fs.rmdirSync(moviePath, { recursive: true });
  }
  if (fs.existsSync(subtitlesPath)) {
    fs.rmdirSync(subtitlesPath, { recursive: true });
  }
  await Movie.findOneAndUpdate(
    { imdbCode: movie.imdbCode },
    {
      downloadComplete: null,
      lastWatched: null,
    },
  );
};

const getDateMonthAgo = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date;
};

// TO DO line below for test purposes, remove later
// const job = new CronJob('*/10 * * * * *', async () => {
const job = new CronJob('00 00 00 * * *', async () => {
  const dateMonthAgo = getDateMonthAgo();
  const movies = await Movie.find({ lastWatched: { $lte: dateMonthAgo } });
  movies.forEach((movie) => removeMovie(movie));
});

export default job;
