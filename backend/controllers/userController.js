/* eslint-disable no-console */
import User from '../models/User.js';

const getUsers = async (req, res, next) => {
  // TO DO: // THIS ROUTE DOES NOT COMPLY WITH API SPECS, HERE FOR COMPATIBILITY, WILL BE DEPRECATED
  console.log('CONTROLLER > USER > get user');
  try {
    const users = await User.find();
    res.json({ users });
  } catch (err) {
    next(err);
  }
};

const getUserInfo = async (req, res, next) => {
  console.log('CONTROLLER > USER > get user info');
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    // TO DO: check if own info then send all info below, otherwise without email and language
    const userInfo = {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      avatarId: user.avatar,
      language: user.language,
    };

    res.json(userInfo);
  } catch (err) {
    next(err);
  }
};

const addUser = async (req, res, next) => {
  console.log('CONTROLLER > USER > add user');
  // TO DO: validate all data and passwords, hash password
  try {
    const newUser = new User({
      username: req.body.username,
      email: `${req.body.username}1@example.com`,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: 'some password',
    });
    newUser.save();

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  console.log('CONTROLLER > USER > update user');
  // TO DO: validate all data and password, hash password
  try {
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

const updatePassword = async (req, res, next) => {
  console.log('CONTROLLER > USER > update password');
  // TO DO: validate token with userId, new password and confirm password, hash password
  try {
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

export default {
  addUser,
  getUsers,
  getUserInfo,
  updateUser,
  updatePassword,
};
