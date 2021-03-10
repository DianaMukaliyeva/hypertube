import axios from 'axios';

// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/movies';

const createComment = async (comment, imdbCode) => {
  const data = {
    comment,
  };
  const res = await axios.post(`${baseUrl}/${imdbCode}/comments`, data);

  return res.data;
};

const getMovieData = async (imdbCode) => {
  const res = await axios.get(`${baseUrl}/${imdbCode}`);

  return res.data;
};

export default {
  createComment,
  getMovieData,
 };