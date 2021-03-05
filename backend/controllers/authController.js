import jwt from 'jsonwebtoken';
import axios from 'axios';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';
import sendResetEmail from '../utilities/email.js';
import google from '../utilities/google.js';

const login = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  const userForToken = {
    id: user.id,
    lang: user.language,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.json({ token });
};

const recoveryEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  const userForToken = {
    id: user.id,
    lang: user.language,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  user.token = token;
  await user.save();
  sendResetEmail(user.email, user.firstname, token, req);

  res.status(200).json('success');
};

const googleURL = (req, res) => {
  res.send(google.getGoogleAuthURL());
};

const googleUser = (req, res) => {
  res.json({ token: google.getUserToken() });
};

const googleCallback = async (req, res) => {
  const code = req.query.code;

  const tokens = await google.getTokens(code);

  const user = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message);
    });

  console.log(
    '🚀 ~ file: authController.js ~ line 66 ~ googleCallback ~ user',
    user
  );

  // validate user
  // create random pw

  const getLanguage = (locale) => {
    if (locale.startsWith('fi')) return 'fi';
    if (locale.startsWith('ru')) return 'ru';
    if (locale.startsWith('de')) return 'de';
    return 'en';
  };

  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync('Kakkels1', salt);
  console.log('password', password);

  const userToDB = {
    username: `${user.given_name}${user.id}`,
    firstname: user.given_name,
    lastname: user.family_name,
    password: password,
    language: getLanguage(user.locale),
    hasPassword: false,
  };
  console.log(
    '🚀 ~ file: authController.js ~ line 91 ~ googleCallback ~ userToDB ',
    userToDB
  );

  const userFromDB = await User.findOrCreate({ email: user.email }, userToDB);

  const userForToken = {
    id: userFromDB.doc._id,
    lang: userFromDB.doc.language,
  };

  google.setUserToken(jwt.sign(userForToken, process.env.SECRET));
  res.redirect(`${process.env.FRONTEND_URL_DEV}?auth=google`);
};

export default {
  login,
  recoveryEmail,
  googleURL,
  googleUser,
  googleCallback,
};
