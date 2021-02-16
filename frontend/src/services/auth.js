import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/auth';

const test = async () => {
  const res = await axios.get(baseUrl + '/test');
  console.log('service test', res.data);
  return res.data;
};

const login = async (email, password) => {
  console.log('credentials', { email, password });
  const res = await axios.post(baseUrl + '/login', { email, password });
  localStorage.setItem('token', res.data.token);
  setAuthToken(res.data.token);
  return res.data;
};

const recoveryLink = async (email) => {
  const res = await axios.post(baseUrl + '/recoverylink', { email });
  return res.data;
};

export default { test, login, recoveryLink };
