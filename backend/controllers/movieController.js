import movieListUtils from '../utilities/movieAPIUtilities.js';
import subtitlesUtils from '../utilities/subtitlesAPI.js';
import movieTorrentUtils from '../utilities/movieTorrentUtilities.js';
import Movie from '../models/Movie.js';
import User from '../models/User.js';
import { detailedError } from '../utilities/errors.js';

const getMovieList = async (req, res) => {
  const userId = req.user;
  const filters = req.query;
  const movies = await movieListUtils.fetchYTSMovieList(filters);
  const user = await User.findById(userId);

  movies.movies = movies.movies.map((movie) => {
    const tempMovie = { ...movie };
    tempMovie.watched = user.watched.some((elem) => elem.movieId === movie.imdbCode);
    return tempMovie;
  });
  res.json(movies);
};

const addMovieToDb = async (req, res) => {
  const newMovie = new Movie({
    serverLocation: req.body.location,
  });
  await newMovie.save();
  res.sendStatus(201);
};

const getMovieEntry = async (req, res) => {
  const imdbCode = req.params.imdb_code;
  const torrentData = await movieListUtils.fetchTorrentData(imdbCode);
  const movieInfo = await movieListUtils.fetchMovieInfo(imdbCode);
  const subtitles = await subtitlesUtils.getSubtitles(imdbCode);
  const comments = []; // TO DO check with Ilja to add here
  res.json(movieListUtils.parseMovieResponse(movieInfo, torrentData, comments, subtitles));
};

const addComment = async (req, res) => {
  const newComment = {
    userId: req.user,
    comment: req.body.comment,
  };
  const imdbCode = req.params.imdb_code;

  if (!newComment.comment) throw detailedError();

  const movie = await Movie.findOneAndUpdate(
    {
      imdbCode,
    },
    {
      $addToSet: {
        comments: newComment,
      },
    },
  );

  if (movie === null) {
    const newMovieInDB = new Movie({
      imdbCode,
      comments: [newComment],
    });
    await newMovieInDB.save();
  }
  res.sendStatus(201);
};

const playMovie = async (req, res, next) => {
  // todo: update route docs
  const { imdbCode } = req.params;
  let movie = await Movie.findOne({ imdbCode });
  if (!movie || !movie.downloadComplete) {
    if (!movie) {
      movie = { imdbCode };
    }
    if (!movie.magnet) movie.magnet = await movieTorrentUtils.getMagnet(imdbCode);
    await movieTorrentUtils.downloadMovie(movie);
    movie = await Movie.findOne({ imdbCode });
  }
  req.serverLocation = movie.serverLocation;
  await movieTorrentUtils.startFileStream(req, res, next);
};

export default {
  getMovieList,
  addMovieToDb,
  getMovieEntry,
  playMovie,
  addComment,
};
