import express from 'express';

import movieController from '../controllers/movieController.js';
import subtitlesController from '../controllers/subtitlesController.js';
import middleware from '../utilities/middleware.js';
import inputValidator from '../utilities/inputValidator.js';

const movieRoute = express.Router();

// special route to prove mkv backend .mkv file conversion capabilities
if (process.env.NODE_ENV === 'development') {
  movieRoute.get('/streamMkv',
    movieController.streamMkv);
}

movieRoute.get('/:imdbCode/play/:token', inputValidator.validateToken, movieController.playMovie);

movieRoute.get('/:imdb_code', middleware.authRequired, movieController.getMovieEntry);

movieRoute.get('/', middleware.authRequired, movieController.getMovieList);

movieRoute.patch('/:imdbCode', middleware.authRequired, movieController.setWatched);

movieRoute.post('/:imdb_code/comments', middleware.authRequired, movieController.addComment);

movieRoute.get(
  '/:imdbCode/subtitles/:lang/:token',
  inputValidator.validateToken,
  subtitlesController.getSubtitles,
);

export default movieRoute;
