import axios from 'axios';

const redirectURI = 'http://localhost:5003/api/auth/42/callback';

const get42URL = () => {
  const baseURL = 'https://api.intra.42.fr/oauth/authorize';

  return `${baseURL}?client_id=${process.env.FORTYTWO_CLIENT_ID}&redirect_uri=${redirectURI}&scope=public&state=${process.env.FORTYTWO_STATE}&response_type=code`;
};

const getAuthorizationToken = async (code, state) => {
  const { data } = await axios.post('https://api.intra.42.fr/oauth/token', {
    grant_type: 'authorization_code',
    client_id: process.env.FORTYTWO_CLIENT_ID,
    client_secret: process.env.FORTYTWO_CLIENT_SECRET,
    code,
    state,
    redirect_uri: redirectURI,
  });

  return `${data.token_type} ${data.access_token}`;
};

const getUser = async (token) => {
  const { data } = await axios.get('https://api.intra.42.fr/v2/me', {
    headers: {
      Authorization: token,
    },
  });

  return {
    email: data.email,
    username: `${data.login}${data.id}`,
    firstname: data.first_name,
    lastname: data.last_name,
    language: 'en',
  };
};

export default { redirectURI, get42URL, getAuthorizationToken, getUser };
