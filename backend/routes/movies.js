import express from 'express';

import movieController from '../controllers/movieController.js';
import subtitlesController from '../controllers/subtitlesController.js';
import middleware from '../utilities/middleware.js';
import inputValidator from '../utilities/inputValidator.js';

const movieRoute = express.Router();

movieRoute.get('/:imdb_code/play', async (req, res, next) => {
  await movieController.playMovie(req, res, next);
});

movieRoute.get('/:imdb_code', async (req, res, next) => {
  await movieController.getMovieEntry(req, res, next);
});

movieRoute.get('/', middleware.authRequired, movieController.getMovieList);

movieRoute.post('/', async (req, res, next) => {
  await movieController.addMovieToDb(req, res, next);
});

movieRoute.post('/:imdb_code/comments', middleware.authRequired, movieController.addComment);

movieRoute.get(
  '/:imdbCode/subtitles/:lang/:token',
  inputValidator.validateToken,
  subtitlesController.getSubtitles,
);

export default movieRoute;
