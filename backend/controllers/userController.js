/* eslint-disable no-console */
import bcrypt from 'bcrypt';

import User from '../models/User.js';

const salt = bcrypt.genSaltSync(10);

const getUsers = async (req, res) => {
  // TO DO: // THIS ROUTE DOES NOT COMPLY WITH API SPECS, HERE FOR COMPATIBILITY, WILL BE DEPRECATED
  const users = await User.find();
  res.json({ users });
};

const getUserInfo = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

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
  });
};

const addUser = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: bcrypt.hashSync(req.body.password, salt),
  });
  await newUser.save();

  res.sendStatus(201);
};

const updateUser = async (req, res) => {
  const {
    username, lastname, firstname, email, password, avatarBase64,
  } = req.body;
  const { userId } = req.params;
  const user = await User.findById(userId);

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
  if (avatarBase64) {
    user.avatar = avatarBase64;
  }
  await user.save();

  res.sendStatus(200);
};

const updatePassword = async (req, res) => {
  const { password, userId } = req.body;

  const user = await User.findById(userId);
  user.password = bcrypt.hashSync(password, salt);
  await user.save();

  res.sendStatus(200);
};

export default {
  addUser,
  getUsers,
  getUserInfo,
  updateUser,
  updatePassword,
};
