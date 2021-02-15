import { detailedError, createDetail } from './errors.js';
import User from '../models/User.js';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const errorHandler = (error, req, res, next) => {
  const {
    statusCode = error.statusCode | '500', // eslint-disable-line no-bitwise
    errorType = error.name,
    details = error.details,
  } = error;

  return next(
    res.status(statusCode).json({
      statusCode,
      errorType,
      details,
    }),
  );
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

const validateUserCreation = async (req, res, next) => {
  const {
    username, email, firstname, lastname, password, confirmPassword,
  } = req.body;
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

export default { errorHandler, unknownEndpoint, validateUserCreation };
