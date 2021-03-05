import movieListUtils from '../utilities/movieAPIUtilities.js';
import Movie from '../models/Movie.js';

const getMovieList = async (req, res) => {
  const { page = 1, ...filters } = req.query;
  const movies = await movieListUtils.fetchYTSMovieList(page, filters);
  res.json(movies);
};

const addMovieToDb = async (req, res, next) => {
  const newMovie = new Movie({
    serverLocation: req.body.location,
  });
  await newMovie.save();
  res.sendStatus(201);
};

const getMovieEntry = async (req, res, next) => {
  const imdbCode = req.params.imdb_code;
  const torrentData = await movieListUtils.fetchTorrentData(imdbCode);
  const movieInfo = await movieListUtils.fetchMovieInfo(imdbCode);
  res.json(movieListUtils.parseMovieResponse(movieInfo, torrentData));
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
