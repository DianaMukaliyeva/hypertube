import axios from 'axios';
import Movie from '../models/Movie.js';
import { notFoundError } from './errors.js';

const { OMDB_KEY, TORRENT_API } = process.env;

const filteredMovieData = (movie) => ({
  title: movie.title,
  imdbCode: movie.imdb_code,
  imdbRating: movie.rating,
  year: movie.year,
  thumbnail: movie.thumbnail,
  hash: movie.torrents[0].hash,
});

const fetchYTSMovieList = async (filters) => {
  let movies = [];
  let hasMore = true;
  const params = {
    limit: 20,
    page: filters.page || 1,
    minimum_rating: filters.imdb || 0,
    genre: filters.genre,
    sort_by: filters.sort_by,
    order_by: filters.order_by,
    query_term: filters.search || '',
  };

  try {
    let res = await axios.get(`${TORRENT_API}`, { params });
    const moviesData = res.data.data;
    const movieList = res.data.data.movies;

    if (moviesData.movie_count === 0) {
      throw notFoundError();
    }
    if (moviesData.movie_count <= params.limit * params.page) {
      hasMore = false;
    }
    if (movieList) {
      await Promise.all(
        movieList.map(async (movie) => {
          res = await axios.get(`http://www.omdbapi.com/?i=${movie.imdb_code}&apikey=${OMDB_KEY}`);
          movie.thumbnail = res.data.Poster; // eslint-disable-line no-param-reassign
        }),
      );
      movies = movieList.map((movie) => filteredMovieData(movie));
    }
  } catch (e) {
    return { movies: [], hasMore: false };
  }
  return { movies, hasMore };
};

const fetchTorrentData = async (imdbCode) => {
  const res = await axios.get(`${TORRENT_API}?query_term=${imdbCode}`);
  const movieData = res.data.data;
  if (res.status !== 200 || movieData.movie_count === 0) throw notFoundError();
  return movieData;
};

const fetchMovieInfo = async (imdbCode) => {
  const res = await axios.get(`http://www.omdbapi.com/?i=${imdbCode}&apikey=${OMDB_KEY}`);
  const movieData = res.data;
  if (res.status !== 200 || movieData.Response === 'False') throw notFoundError(); // omdbapi is not very restful
  return movieData;
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

/* storing magnet link components here for now as we might need them in movie routes later, sry.
also todo: add tracker listing into a config file
const { hash } = torrentData.movies[0].torrents[0];
`magnet:?xt=urn:btih:${hash}&dn=${movieInfo.Title}&tr=[PLACEHOLDER_FOR_TRACKER]`; */
const parseMovieResponse = (movieInfo, torrentData, comments, subtitles) => ({
  title: movieInfo.Title,
  imdbRating: torrentData.movies[0].rating,
  year: movieInfo.Year,
  genre: movieInfo.Genre, // need to split this if we only want one
  description: movieInfo.Plot,
  length: parseInt(movieInfo.Runtime, 10),
  director: movieInfo.Director,
  cast: movieInfo.Actors,
  downloaded: false, // if movie is already downloaded to server, identified with imdbCode
  watched: false, // to see if user has already watched the movie, identified with imdbCode
  comments,
  subtitles,
});

export default {
  fetchYTSMovieList,
  fetchTorrentData,
  fetchMovieInfo,
  parseMovieResponse,
  fetchComments,
};
