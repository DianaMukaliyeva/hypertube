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

const getMovieEntry = async (req, res, next) => {
  try {
    const imdbCode = req.params.imdb_code;
    const torrentData = await movieListUtils.fetchTorrentData(imdbCode); // TODO: add error handling
    const movieInfo = await movieListUtils.fetchMovieInfo(imdbCode);
    const { hash } = torrentData.movies[0].torrents[0];
    const magnet = `magnet:?xt=urn:btih:${hash}&dn=${movieInfo.Title}tr=http://track.one:1234/announce&tr=udp://track.two:80`;

    // this response needs to be moved to a separate parser function in utilities
    res.json({
      title: movieInfo.Title,
      imdbCode,
      imdbRating: torrentData.movies[0].rating,
      year: movieInfo.Year,
      genre: movieInfo.Genre, // need to parse if we only want one
      description: movieInfo.Plot,
      length: movieInfo.Runtime,
      director: movieInfo.Director,
      cast: movieInfo.Actors.split(/, +/),
      subtitles: ['PLACEHOLDER'], // todo: investigate API for this
      comments: ['PLACEHOLDER'], // todo: add functionality
      downloaded: false, // if movie is already downloaded to server, identified with imdbCode
      watched: false, // to see if user has already watched the movie, identified with imdbCode
      magnet,
    });
  } catch (err) { next(err); }
};

export default {
  getMovieList,
  addMovieToDb,
  getMovieEntry,
};
