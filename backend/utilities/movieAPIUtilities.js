import axios from 'axios';
import Movie from '../models/Movie.js';
import User from '../models/User.js';
import { notFoundError } from './errors.js';

const requestError = new Error('Could not fetch movie data'); // todo: specify these more explicitly in a separate file
requestError.code = 'movieRequest';
requestError.name = 'Request failed';

const fetchYTSMovieList = async (page = 1) => {
  const limit = 24;
  const { OMDB_KEY, TORRENT_API } = process.env;

  let res = await axios
    .get(`${TORRENT_API}?sort_by=download_count&page=${page}&limit=${limit}&`);
  if (res.status !== 200) throw new Error('Could not fetch movie list!'); // todo: custom errors for these
  if (!res.data.data.movies) throw new Error('Page does not exist'); // todo: custom errors for these
  const movieList = res.data.data.movies;
  let movies = [];
  await Promise.all(movieList.map(async (movie) => {
    res = await axios.get(`http://www.omdbapi.com/?i=${movie.imdb_code}&apikey=${OMDB_KEY}`);
    if (res.status !== 200) throw requestError;
    movies = [...movies, {
      title: res.data.Title,
      imdbCode: movie.imdb_code,
      imdbRating: movie.rating,
      year: parseInt(res.data.Year, 10),
      thumbnail: res.data.Poster,
      hash: `${movie.torrents[0].hash}`,
      watched: false, // placeholder until the backend logic is added
    }];
  }));
  return { movies };
};

const fetchTorrentData = async (imdbCode) => {
  const { TORRENT_API } = process.env;
  const res = await axios
    .get(`${TORRENT_API}?query_term=${imdbCode}`);
  if (res.status !== 200 || !res.data.data) throw requestError;
  return res.data.data;
};

const fetchMovieInfo = async (imdbCode) => {
  const { OMDB_KEY } = process.env;
  const res = await axios.get(`http://www.omdbapi.com/?i=${imdbCode}&apikey=${OMDB_KEY}`);
  if (res.status !== 200) throw requestError;
  return res.data;
};

const fetchComments = async (imdbCode) => {
  const res = await Movie.findOne({
    imdbCode,
  }).populate('comments.userId', {
    username: 1,
    firstname: 1,
    lastname: 1,
    avatar: 1,
  });

  return (!res) ? false : res.comments;
};

const parseMovieResponse = (movieInfo, torrentData, comments) => (
  /* storing magnet link components here for now as we might need them in movie routes later, sry.
  also todo: add tracker listing into a config file
 const { hash } = torrentData.movies[0].torrents[0];
 `magnet:?xt=urn:btih:${hash}&dn=${movieInfo.Title}&tr=[PLACEHOLDER_FOR_TRACKER]`; */
  {
    title: movieInfo.Title,
    imdbRating: torrentData.movies[0].rating,
    year: movieInfo.Year,
    genre: movieInfo.Genre, // need to split this if we only want one
    description: movieInfo.Plot,
    length: parseInt(movieInfo.Runtime, 10),
    director: movieInfo.Director,
    cast: movieInfo.Actors,
    subtitles: [{ en: 'placeholder subtitle object' }], // todo: investigate API for this
    downloaded: false, // if movie is already downloaded to server, identified with imdbCode
    watched: false, // to see if user has already watched the movie, identified with imdbCode
    comments,
  });

export default {
  fetchYTSMovieList,
  fetchTorrentData,
  fetchMovieInfo,
  parseMovieResponse,
  fetchComments,
};
