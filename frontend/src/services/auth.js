import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const auth = async () => {
  // console.log('service > auth > auth');
  const res = await axios.get(baseUrl + '/login');
  return res.data;
};

const login = async (credentials) => {
  // console.log('service > auth > login');
  const res = await axios.post(baseUrl + '/login', credentials);
  localStorage.setItem('token', res.data.token);
  setAuthToken(localStorage.getItem('token'));
  return res.data;
};

const recoveryLink = async (credentials) => {
  // console.log('service > auth > recovery link');
  const res = await axios.post(baseUrl + '/recoverylink', credentials);
  return res.data;
};

export default { auth, login, recoveryLink };
