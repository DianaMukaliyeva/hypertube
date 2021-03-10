import movieListUtils from '../utilities/movieAPIUtilities.js';
import Movie from '../models/Movie.js';

import { detailedError } from '../utilities/errors.js';

const getMovieList = async (req, res, next) => { // todo: add parameters
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

const getMovieEntry = async (req, res, next) => {
  try {
    const imdbCode = req.params.imdb_code;
    const torrentData = await movieListUtils.fetchTorrentData(imdbCode);
    const movieInfo = await movieListUtils.fetchMovieInfo(imdbCode);
    res.json(movieListUtils.parseMovieResponse(movieInfo, torrentData));
  } catch (err) { next(err); }
};

const addComment = async (req, res) => {
  const newComment = {
    userId: req.user,
    comment: req.body.comment,
  };
  const imdbCode = req.params.imdb_code;

  if (!newComment.comment) throw detailedError();

  const movie = await Movie.findOneAndUpdate({
    imdbCode,
  }, {
    $addToSet: {
      comments: newComment,
    },
  });

  if (movie === null) {
    const newMovieInDB = new Movie({
      imdbCode,
      comments: [
        {
          userId: req.body.userId,
          comment: req.body.comment,
        },
      ],
    });
    await newMovieInDB.save();
  }

  res.sendStatus(201);
};

export default {
  getMovieList,
  addMovieToDb,
  getMovieEntry,
  addComment,
};
