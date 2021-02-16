/* eslint-disable no-console */
import bcrypt from 'bcrypt';

import { detailedError, createDetail } from './errors.js';
import User from '../models/User.js';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  console.log('MIDDLEWARE > ERROR HANDLER');
  const {
    statusCode = error.statusCode | '500', // eslint-disable-line no-bitwise
    errorType = error.name,
    details = error.details,
  } = error;

  console.log(error);

  return res.status(statusCode).json({
    statusCode,
    errorType,
    details,
  });
};

const unknownEndpoint = (req, res) => res.status(404).send({ error: 'unknown endpoint' }).end();

const validateField = async (value, fieldName) => {
  if (!value) {
    return createDetail(fieldName, value, 'required');
  }
  switch (fieldName) {
    case 'email':
      if (!emailRegex.test(value)) {
        return createDetail(fieldName, value, 'invalid format');
      }
      if (await User.findOne((email) => email === fieldName.toLowerCase())) {
        return createDetail(fieldName, value, 'not unique');
      }
      break;
    case 'username':
      if (!/^[a-zA-Z0-9]+$/.test(value)) {
        return createDetail(fieldName, value, 'invalid characters');
      }
      if (await User.findOne((username) => username === fieldName.toLowerCase())) {
        return createDetail(fieldName, value, 'not unique');
      }
      break;
    case 'userId':
      if (!/^[0-9a-fA-F]{24}$/.test(value)) {
        return createDetail(fieldName, value, 'not valid');
      }
      if (!(await User.findById(value))) {
        return createDetail(fieldName, value, 'not found');
      }
      break;
    default:
      if (!/^[a-zA-Z0-9 ]+$/.test(value)) {
        return createDetail(fieldName, value, 'invalid characters');
      }
  }
  return '';
};

const validatePasswords = (password, confirmPassword) => {
  if (!password) {
    return createDetail('password', password, 'required');
  }
  if (!confirmPassword) {
    return createDetail('confirmPassword', confirmPassword, 'required');
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/.test(password)) {
    return createDetail('password', '********', 'invalid format');
  }
  if (password !== confirmPassword) {
    return createDetail('confirmPassword', '*******', 'do not match');
  }
  return '';
};

const validateResetToken = async (token, userId) => {
  if (!token) {
    return createDetail('resetToken', token, 'required');
  }

  const user = await User.findById(userId);
  if (user.token !== token) {
    return createDetail('resetToken', token, 'not valid');
  }
  return '';
};

const validateUserCreation = async (req, res, next) => {
  const { username, email, firstname, lastname, password, confirmPassword } = req.body;
  let errors = [];

  errors.push(await validateField(username, 'username'));
  errors.push(await validateField(email, 'email'));
  errors.push(await validateField(lastname, 'lastname'));
  errors.push(await validateField(firstname, 'firstname'));
  errors.push(validatePasswords(password, confirmPassword));
  errors = errors.filter((error) => error);

  if (errors.length > 0) {
    throw detailedError(errors);
  }

  next();
};

const validatePasswordReset = async (req, res, next) => {
  const { password, confirmPassword, resetToken, userId } = req.body;
  let errors = [];

  const userIdError = await validateField(userId, 'userId');
  errors.push(userIdError);

  if (!userIdError) {
    errors.push(validatePasswords(password, confirmPassword));
    errors.push(await validateResetToken(resetToken, userId));
  }

  errors = errors.filter((error) => error);

  if (errors.length > 0) {
    throw detailedError(errors);
  }

  next();
};

const isPasswordValid = async (password, userId) => {
  const user = await User.findById(userId);
  return bcrypt.compare(password, user.password);
};

const validateUserUpdation = async (req, res, next) => {
  const { username, lastname, firstname, email, oldPassword, password, confirmPassword } = req.body;
  const { userId } = req.params;
  let errors = [];

  const userIdError = await validateField(userId, 'userId');
  errors.push(userIdError);

  if (!userIdError) {
    if (!oldPassword) {
      errors.push(createDetail('oldPassword', '', 'required'));
    } else if (!(await isPasswordValid(oldPassword, userId))) {
      errors.push([createDetail('oldPassword', '******', 'wrong password')]);
    }
    if (username) {
      errors.push(await validateField(username, 'username'));
    }
    if (email) {
      errors.push(await validateField(email, 'email'));
    }
    if (lastname) {
      errors.push(await validateField(lastname, 'lastname'));
    }
    if (firstname) {
      errors.push(await validateField(firstname, 'firstname'));
    }
    if (password || confirmPassword) {
      errors.push(validatePasswords(password, confirmPassword));
    }
  }

  errors = errors.filter((error) => error);

  if (errors.length > 0) {
    throw detailedError(errors);
  }

  next();
};

export default {
  errorHandler,
  unknownEndpoint,
  validateUserCreation,
  validateUserUpdation,
  validatePasswordReset,
};
