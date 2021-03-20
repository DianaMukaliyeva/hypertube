import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import { notFoundError } from '../utilities/errors.js';

const salt = bcrypt.genSaltSync(10);

const getUserInfo = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    throw notFoundError();
  }

  if (req.user && req.user.id === userId) {
    return res.json({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      avatarBase64String: user.avatar,
    });
  }

  return res.json({
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    avatarBase64String: user.avatar,
    language: user.language,
    hasPw: user.hasPw,
  });
};

const addUser = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    language: req.body.language,
    password: bcrypt.hashSync(req.body.password, salt),
  });
  await newUser.save();

  res.sendStatus(201);
};

const updateUser = async (req, res) => {
  const {
    username, lastname, language, firstname, email, password, avatarBase64String,
  } = req.body;
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    throw notFoundError();
  }

  if (username) {
    user.username = username;
  }
  if (email) {
    user.email = email;
  }
  if (lastname) {
    user.lastname = lastname;
  }
  if (firstname) {
    user.firstname = firstname;
  }
  if (password) {
    user.password = bcrypt.hashSync(req.body.password, salt);
  }
  if (avatarBase64String !== undefined) {
    user.avatar = avatarBase64String;
  }
  if (language) {
    user.language = language;
  }

  await user.save();

  if (language) {
    const userForToken = {
      id: userId,
      lang: language,
    };
    return res.json({ token: jwt.sign(userForToken, process.env.SECRET) });
  }

  return res.sendStatus(200);
};

const updatePassword = async (req, res) => {
  const { password, userId } = req.body;

  await User.findByIdAndUpdate(userId, {
    hasPw: true,
    password: bcrypt.hashSync(password, salt),
    token: '',
  });

  res.sendStatus(200);
};

export default {
  addUser,
  getUserInfo,
  updateUser,
  updatePassword,
};
