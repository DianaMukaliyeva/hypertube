import axios from 'axios';
import { notFoundError } from './errors.js';

const { OMDB_KEY, TORRENT_API } = process.env;

const filteredMovieData = (movie) => ({
  title: movie.title,
  imdbCode: movie.imdb_code,
  imdbRating: movie.rating,
  year: movie.year,
  thumbnail: movie.thumbnail,
  seeds: movie.torrents.reduce((c, p) => (p.size_bytes < c.size_bytes ? p : c)).seeds,
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

const getParsedInfo = (res) => {
  if (res && res.data && res.data.data && res.data.data.movies && res.data.data.movies[0]) {
    const movie = res.data.data.movies[0];
    return {
      Title: movie.title || '',
      imdbRating: movie.rating || '',
      Year: movie.year || '',
      Genre: movie.genres && movie.genres.join(', '),
      Plot: movie.description_full || '',
      Runtime: '',
      Director: '',
      Actors: '',
    };
  }
  throw notFoundError();
};

const fetchMovieInfo = async (imdbCode) => {
  let movieData;
  let res;
  try {
    res = await axios.get(`http://www.omdbapi.com/?i=${imdbCode}&apikey=${OMDB_KEY}`);
    movieData = res.data;
    if (res.status !== 200 || movieData.Response === 'False') throw notFoundError();
  } catch (e) {
    res = await axios.get(`${TORRENT_API}?query_term=${imdbCode}`);
    movieData = getParsedInfo(res);
  }
  return movieData;
};

const parseMovieResponse = (movieInfo, comments, subtitles) => ({
  title: movieInfo.Title || '',
  imdbRating: movieInfo.imdbRating || '',
  year: movieInfo.Year || '',
  genre: movieInfo.Genre || '',
  description: movieInfo.Plot || '',
  length: parseInt(movieInfo.Runtime, 10),
  director: movieInfo.Director || '',
  cast: movieInfo.Actors || '',
  comments,
  subtitles,
});

export default {
  fetchYTSMovieList,
  fetchTorrentData,
  fetchMovieInfo,
  parseMovieResponse,
};
