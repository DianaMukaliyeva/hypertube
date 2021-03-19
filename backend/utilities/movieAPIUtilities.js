import axios from 'axios';
import { notFoundError } from './errors.js';

const { OMDB_KEY, TORRENT_API } = process.env;
const requestError = new Error('Could not fetch movie data'); // todo: specify these more explicitly in a separate file
requestError.code = 'movieRequest';
requestError.name = 'Request failed';

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
  if (res.status !== 200 || !res.data.data) throw requestError;
  return res.data.data;
};

const fetchMovieInfo = async (imdbCode) => {
  const res = await axios.get(`http://www.omdbapi.com/?i=${imdbCode}&apikey=${OMDB_KEY}`);
  if (res.status !== 200) throw requestError;
  return res.data;
};

/* storing magnet link components here for now as we might need them in movie routes later, sry.
also todo: add tracker listing into a config file
const { hash } = torrentData.movies[0].torrents[0];
`magnet:?xt=urn:btih:${hash}&dn=${movieInfo.Title}&tr=[PLACEHOLDER_FOR_TRACKER]`; */
const parseMovieResponse = (movieInfo, comments, subtitles) => ({
  title: movieInfo.Title,
  imdbRating: movieInfo.imdbRating,
  year: movieInfo.Year,
  genre: movieInfo.Genre, // need to split this if we only want one
  description: movieInfo.Plot,
  length: parseInt(movieInfo.Runtime, 10),
  director: movieInfo.Director,
  cast: movieInfo.Actors,
  comments,
  subtitles,
});

export default {
  fetchYTSMovieList,
  fetchTorrentData,
  fetchMovieInfo,
  parseMovieResponse,
};
