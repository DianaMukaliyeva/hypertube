import axios from 'axios';
const baseUrl = '/api/auth/login';

const login = async (credentials) => {
  console.log('login');
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const recoveryLink = async (credentials) => {
  console.log('recovery link');
  const response = await axios.post(baseUrl + '/recoverylink', credentials);
  return response.data;
};

export default { login, recoveryLink };
