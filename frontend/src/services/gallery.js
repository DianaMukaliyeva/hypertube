import axios from 'axios';

// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/movies';

const generateQueryParams = (filter) => {
  const params = Object.keys(filter).reduce((result, key) => {
    if (key === 'sort' && filter[key]) {
      const sorts = filter[key].split(' ');
      result += `&sort_by=${sorts[0]}&order_by=${sorts[1]}`;
    } else {
      result += filter[key] ? `&${key}=${filter[key]}` : '';
    }
    return result;
  }, '');
  return params;
};

const getMovies = async (page, filter, search) => {
  const params = generateQueryParams(filter);
  const res = await axios.get(baseUrl + `?page=${page}&search=${search}${params}`);
  return res.data;
};

export default { getMovies };
