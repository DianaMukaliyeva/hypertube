import movieListUtils from '../utilities/movieAPIUtilities.js';
import Movie from '../models/Movie.js';

const getMovieList = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    res.json(await movieListUtils.fetchYTSMovieList(page));
  } catch (err) { next(err); }
};

const addMovieToDb = async (req, res, next) => {
  try {
    const newMovie = new Movie({
      serverLocation: req.body.location,
    });
    await newMovie.save();
    res.sendStatus(201);
  } catch (err) { next(err); }
};

export default {
  getMovieList,
  addMovieToDb,
};
