/* eslint-disable no-console */
import bcrypt from 'bcrypt';

import User from '../models/User.js';

const getUsers = async (req, res) => {
  // TO DO: // THIS ROUTE DOES NOT COMPLY WITH API SPECS, HERE FOR COMPATIBILITY, WILL BE DEPRECATED
  console.log('CONTROLLER > USER > get user');
  const users = await User.find();
  res.json({ users });
};

const getUserInfo = async (req, res) => {
  console.log('CONTROLLER > USER > GET USER INFO');
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
  console.log('CONTROLLER > USER > ADD USER');
  const salt = bcrypt.genSaltSync(10);

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
  console.log('CONTROLLER > USER > update user');
  // TO DO: validate all data and password, hash password
  res.sendStatus(200);
};

const updatePassword = async (req, res) => {
  console.log('CONTROLLER > USER > update password');
  // TO DO: validate token with userId, new password and confirm password, hash password
  res.sendStatus(200);
};

export default {
  addUser,
  getUsers,
  getUserInfo,
  updateUser,
  updatePassword,
};
