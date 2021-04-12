import pkg from 'googleapis';
import axios from 'axios';

const { google } = pkg;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const backendURI = 'https://hypertube-demo.herokuapp.com';

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  `${backendURI}/api/auth/google/callback`,
);

const getGoogleAuthURL = () => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
  });
};

const getTokens = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
};

const getUser = async (tokens) => {
  const { data } = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
    {
      headers: {
        Authorization: `Bearer ${tokens.id_token}`,
      },
    },
  );

  const getLanguage = (locale) => {
    if (locale.startsWith('fi')) return 'fi';
    if (locale.startsWith('ru')) return 'ru';
    if (locale.startsWith('de')) return 'de';
    return 'en';
  };

  return {
    email: data.email,
    username: `${data.given_name}${data.id}`,
    firstname: data.given_name,
    lastname: data.family_name,
    language: getLanguage(data.locale),
  };
};

export default {
  getGoogleAuthURL,
  getTokens,
  getUser,
};
