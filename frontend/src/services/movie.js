import axios from 'axios';

const baseUrl = '/api/movies';

const createComment = async (data, imdbCode) => {
  const res = await axios.post(`${baseUrl}/${imdbCode}/comments`, data);

  return res.data;
};

const getComments = async (imdbCode) => {
  const res = await axios.get(`${baseUrl}/${imdbCode}/comments`);

  return res.data;
};

const setWatched = async (imdbCode) => {
  const res = await axios.patch(`${baseUrl}/${imdbCode}`);

  return res.data;
};

const getMovieData = async (imdbCode) => {
  const res = await axios.get(`${baseUrl}/${imdbCode}`);

  return res.data;
};

export default {
  createComment,
  getMovieData,
  setWatched,
  getComments,
};
