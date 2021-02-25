import axios from 'axios';

// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/movies';

const getMovies = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export default { getMovies };
