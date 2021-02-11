import express from 'express';
import movieController from '../controllers/movieController.js';

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

export default movieRoute;
