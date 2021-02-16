import axios from 'axios';

// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/users';

const get = async (userId) => {
  const res = await axios.get(baseUrl + `/${userId}`);
  return res.data;
};

const create = async (data) => {
  const res = await axios.post(baseUrl + '/', data);
  return res.data;
};

const update = async (userId, data) => {
  const res = await axios.patch(baseUrl + `/${userId}`, data);
  return res.data;
};

const pwdUpdate = async (data) => {
  const res = await axios.patch(baseUrl + '/', data);
  return res.data;
};

export default { get, create, update, pwdUpdate };
