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

const fetchComments = async (imdbCode) => {
  const res = await Movie.findOne({
    imdbCode,
  }).populate('comments.user', {
    username: 1,
    firstname: 1,
    lastname: 1,
    avatar: 1,
  });

  if (!res) return;
  // eslint-disable-next-line consistent-return
  return res.comments;
};

const getMovieEntry = async (req, res) => {
  const imdbCode = req.params.imdb_code;
  const movieInfo = await movieListUtils.fetchMovieInfo(imdbCode);
  const subtitles = await subtitlesUtils.getSubtitles(imdbCode);
  const comments = await fetchComments(imdbCode);
  res.json(movieListUtils.parseMovieResponse(movieInfo, comments, subtitles));
};

const addComment = async (req, res) => {
  const newComment = {
    user: req.user,
    comment: req.body.comment,
  };
  const { imdbCode } = req.params;

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

// a controller to demonstrate mkv conversion
const streamMkv = async (req, res, next) => {
  const imdbCode = 'MKV_SAMPLE';
  const magnet = process.env.MKV_MAGNET_LINK;
  const movie = await Movie.findOne({ imdbCode });
  if (!movie) {
    const newMovie = new Movie({
      imdbCode,
      magnet,
    });
    await newMovie.save();
  }
  req.params = { imdbCode };
  await playMovie(req, res, next);
};

const getComment = async (req, res) => {
  const { imdbCode } = req.params;

  const data = await Movie.findOne({
    imdbCode,
  }).populate('comments.user', {
    username: 1,
    firstname: 1,
    lastname: 1,
    avatar: 1,
  });
  res.json({ comments: data && data.comments ? data.comments : [] });
};

const setWatched = async (req, res) => {
  const userId = req.user;
  const { imdbCode } = req.params;

  const movie = await Movie.findOneAndUpdate(
    {
      imdbCode,
    },
    {
      lastWatched: Date.now(),
    },
  );

  if (movie === null) {
    const newMovieInDB = new Movie({
      imdbCode,
      lastWatched: Date.now(),
    });
    newMovieInDB.save();
  }

  // TO DO where should we put this and what time should we save
  await User.findByIdAndUpdate(userId, {
    $addToSet: {
      watched: { movieId: imdbCode, time: Date.now() },
    },
  });

  res.sendStatus(201);
};

export default {
  getMovieList,
  addMovieToDb,
  getMovieEntry,
  playMovie,
  addComment,
  streamMkv,
  getComment,
  setWatched,
};
