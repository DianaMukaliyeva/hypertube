import axios from 'axios';

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
  return res.data.data.movies[0];
};

const fetchMovieInfo = async (imdbCode) => {
  const { OMDB_KEY } = process.env;
  const res = await axios.get(`http://www.omdbapi.com/?i=${imdbCode}&apikey=${OMDB_KEY}`);
  if (res.status !== 200) throw requestError;
  return res.data;
};

const parseMovieResponse = (movieInfo, torrentData) => (

  /* storing magnet link components here for now as we might need them in movie routes later, sry.
  also todo: add tracker listing into a config file
 const { hash } = torrentData.movies[0].torrents[0];
 `magnet:?xt=urn:btih:${hash}&dn=${movieInfo.Title}&tr=[PLACEHOLDER_FOR_TRACKER]`; */

  {
    title: movieInfo.Title,
    imdbRating: torrentData.rating,
    year: movieInfo.Year,
    genre: movieInfo.Genre, // need to split this if we only want one
    description: movieInfo.Plot,
    length: parseInt(movieInfo.Runtime, 10),
    director: movieInfo.Director,
    cast: movieInfo.Actors.split(', '),
    subtitles: [{ en: 'placeholder subtitle object' }], // todo: investigate API for this
    hash: torrentData.torrents[0].hash,
    downloaded: false, // if movie is already downloaded to server, identified with imdbCode
    watched: false, // to see if user has already watched the movie, identified with imdbCode
    comments: [{ userId: 123, username: 'Nina Lustig', message: 'Placeholder comment' }], // todo: add functionality
  });

export default {
  fetchYTSMovieList,
  fetchTorrentData,
  fetchMovieInfo,
  parseMovieResponse,
};
