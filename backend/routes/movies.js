import express from 'express';

import movieController from '../controllers/movieController.js';
import subtitlesController from '../controllers/subtitlesController.js';
import middleware from '../utilities/middleware.js';
import inputValidator from '../utilities/inputValidator.js';

const movieRoute = express.Router();

movieRoute.get('/:imdb_code', async (req, res, next) => {
  await movieController.getMovieEntry(req, res, next);
});

movieRoute.get('/', middleware.authRequired, movieController.getMovieList);

// TO DO do we need this route?
movieRoute.post('/', async (req, res, next) => {
  await movieController.addMovieToDb(req, res, next);
});

movieRoute.patch('/:imdbCode', middleware.authRequired, movieController.setWatched);

movieRoute.post('/:imdb_code/comments', middleware.authRequired, movieController.addComment);

movieRoute.get(
  '/:imdbCode/subtitles/:lang/:token',
  inputValidator.validateToken,
  subtitlesController.getSubtitles,
);

export default movieRoute;
