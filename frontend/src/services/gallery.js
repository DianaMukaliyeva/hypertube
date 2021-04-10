import axios from 'axios';

const baseUrl = '/api/movies';

const generateQueryParams = (filter, search) => {
  let params = Object.keys(filter).reduce((result, key) => {
    if (key === 'sort' && filter[key]) {
      const sorts = filter[key].split(' ');
      result += `&sort_by=${sorts[0]}&order_by=${sorts[1]}`;
    } else {
      result += filter[key] ? `&${key}=${filter[key]}` : '';
    }

    return result;
  }, '');
  if (!filter.sort) {
    params += search ? '&sort_by=title&order_by=asc' : '&sort_by=rating&order_by=desc';
  }
  params += search ? `&search=${search}` : '';

  return params;
};

const getMovies = async (page, filter, search) => {
  const params = generateQueryParams(filter, search);
  const res = await axios.get(baseUrl + `?page=${page}${params}`);

  return res.data;
};

export default { getMovies };
