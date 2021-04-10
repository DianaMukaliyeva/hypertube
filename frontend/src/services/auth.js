import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

const baseUrl = '/api/auth';

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

const googleUrl = async () => {
  const res = await axios.get(baseUrl + '/google');
  return res.data;
};

const fortytwoUrl = async () => {
	const res = await axios.get(baseUrl + '/42');
	return res.data;
};

const getToken = async (key) => {
	const res = await axios.get(baseUrl + `/token/${key}`);
	if (res.status === 200 && res.data.token)
		localStorage.setItem('token', res.data.token);
	return res.data.token;
};

export default { login, recoveryLink, getToken, googleUrl, fortytwoUrl };
