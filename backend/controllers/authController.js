/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';
import axios from 'axios';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';
import sendResetEmail from '../utilities/email.js';
import google from '../utilities/google.js';
import fortytwo from '../utilities/42.js';

let userToken = null;

const setUserToken = (id, lang) => {
  const userForToken = { id, lang };

  userToken = jwt.sign(userForToken, process.env.SECRET);
};

const getUserToken = (req, res) => {
  res.json({ token: userToken });
};

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

const findOrCreateUser = async (user) => {
  let userFromDB = await User.find({ email: user.email }).map((u) => u[0]);

  if (!userFromDB) {
    const salt = bcrypt.genSaltSync(10);

    const userToDB = new User({
      ...user,
      password: bcrypt.hashSync(process.env.OMNIAUTH_PW, salt),
      hasPw: false,
    });

    userFromDB = await userToDB.save();
  }

  return userFromDB;
};

const googleCallback = async (req, res) => {
  const { code } = req.query;

  const tokens = await google.getTokens(code);

  const { data: user } = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
    {
      headers: {
        Authorization: `Bearer ${tokens.id_token}`,
      },
    }
  );

  const getLanguage = (locale) => {
    if (locale.startsWith('fi')) return 'fi';
    if (locale.startsWith('ru')) return 'ru';
    if (locale.startsWith('de')) return 'de';
    return 'en';
  };

  const userToDB = {
    email: user.email,
    username: `${user.given_name}${user.id}`,
    firstname: user.given_name,
    lastname: user.family_name,
    language: getLanguage(user.locale),
  };

  const userFromDB = await findOrCreateUser(userToDB);

	setUserToken(userFromDB._id, userFromDB.language);

  res.redirect(`${process.env.FRONTEND_URL_DEV}?auth=token`);
};

const fortytwoURL = (req, res) => {
  res.send(fortytwo.get42URL());
};

const fortytwoCallback = async (req, res) => {
  const { code, state } = req.query;

  if (code === undefined || state !== process.env.FORTYTWO_STATE)
    return res.redirect(process.env.FRONTEND_URL_DEV);

  const token = await fortytwo.getAuthorizationToken(code, state);

  const userToDB = await fortytwo.getUser(token);

  const userFromDB = await findOrCreateUser(userToDB);

	setUserToken(userFromDB._id, userFromDB.language);

  res.redirect(`${process.env.FRONTEND_URL_DEV}?auth=token`);
};

export default {
  login,
  recoveryEmail,
  googleURL,
  googleCallback,
  fortytwoURL,
  fortytwoCallback,
  getUserToken,
};
