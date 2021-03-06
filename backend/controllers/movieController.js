import movieListUtils from '../utilities/movieAPIUtilities.js';
import movieTorrentUtils from '../utilities/movieTorrentUtilities.js';
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
    const { imdbCode } = req.params;
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

const playMovie = async (req, res, next) => {
  // request params/body should include optional start time
  // from which to start the eventual filestream from
  // todo: update route docs
  const { imdbCode } = req.params;
  Movie.findOne({ imdbCode }, (err, obj) => {
    if (err) throw err;
    else if (obj && 'serverLocation' in obj) {
      // adding location as a request param might not be the prettiest approach...
      req.serverLocation = obj.serverLocation;
      movieTorrentUtils.startFileStream(req, res, next);
    } else movieTorrentUtils.downloadMovie(req, res, next);
  });
};

export default {
  getMovieList,
  addMovieToDb,
  getMovieEntry,
  playMovie,
  addComment,
};
