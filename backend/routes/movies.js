import express from 'express';
import movieController from '../controllers/movieController.js';
import middleware from '../utilities/middleware.js';

const movieRoute = express.Router();

movieRoute.get('/:imdb_code', async (req, res, next) => {
  await movieController.getMovieEntry(req, res, next);
});

movieRoute.get('/', async (req, res, next) => {
  await movieController.getMovieList(req, res, next);
});

movieRoute.post('/', async (req, res, next) => {
  await movieController.addMovieToDb(req, res, next);
});

movieRoute.post('/:imdb_code/comments',
  middleware.authRequired,
  movieController.addComment);

export default movieRoute;
