import fs from 'fs';
import { CronJob } from 'cron';

import Movie from '../models/Movie.js';

const removeMovie = async (movie) => {
  const subtitlesPath = `./subtitles/${movie.imdbCode}`;
  const moviePath = `./movies/${movie.imdbCode}`;

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

const job = new CronJob('00 00 00 * * *', async () => {
  const dateMonthAgo = getDateMonthAgo();
  const movies = await Movie.find({ lastWatched: { $lte: dateMonthAgo } });
  movies.forEach((movie) => removeMovie(movie));
});

export default job;
