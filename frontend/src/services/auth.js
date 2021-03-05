import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/auth';

const login = async (email, password) => {
  const res = await axios.post(baseUrl + '/login', { email, password });
  localStorage.setItem('token', res.data.token);
  setAuthToken(res.data.token);
  return res.data;
};

const recoveryLink = async (email) => {
  const res = await axios.post(baseUrl + '/recoverylink', { email });
  return res.data;
};

const googleLogin = async () => {
  const res = await axios.get(baseUrl + '/google');
  localStorage.setItem('token', res.data.token);
  setAuthToken(res.data.token);
  return res.data;
};

const googleUrl = async () => {
  const res = await axios.get(baseUrl + '/google/url');
  return res.data;
};

export default { login, recoveryLink, googleLogin, googleUrl };
