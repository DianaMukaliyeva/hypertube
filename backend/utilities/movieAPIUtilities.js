import axios from 'axios';

const fetchYTSMovieList = async (page = 1) => {
  const limit = 24;
  const { OMDB_KEY, TORRENT_API } = process.env;

  let res = await axios
    .get(`${TORRENT_API}?sort_by=year&page=${page}&limit=${limit}&`);
  if (res.status !== 200) throw new Error('Could not fetch movie list!');
  if (!res.data.data.movies) throw new Error('Page does not exist');
  const movieList = res.data.data.movies;
  let movies = [];
  await Promise.all(movieList.map(async (movie) => {
    res = await axios.get(`http://www.omdbapi.com/?i=${movie.imdb_code}&apikey=${OMDB_KEY}`);
    if (res.status !== 200) throw new Error(`Could not fetch movie data from ${movie.imdb_code}!`);
    movies = [...movies, {
      title: res.data.Title,
      imdbCode: movie.imdb_code,
      imdbRating: movie.rating,
      year: res.data.Year,
      thumbnail: res.data.Poster,
      hash: `${movie.torrents[0].hash}`,
      watched: false, // placeholder
    }];
  }));
  return movies;
};

const fetchTorrentData = async (imdbCode) => {
  const { TORRENT_API } = process.env;
  const res = await axios
    .get(`${TORRENT_API}?query_term=${imdbCode}`);
  if (res.status !== 200 || !res.data.data) throw new Error(`Could not fetch movie entry with id ${imdbCode}!`);
  return res.data.data;
};

const fetchMovieInfo = async (imdbCode) => {
  const { OMDB_KEY } = process.env;
  const res = await axios.get(`http://www.omdbapi.com/?i=${imdbCode}&apikey=${OMDB_KEY}`);
  if (res.status !== 200) throw new Error(`Could not fetch movie data from ${imdbCode}!`);
  return res.data;
};
export default {
  fetchYTSMovieList,
  fetchTorrentData,
  fetchMovieInfo,
};
