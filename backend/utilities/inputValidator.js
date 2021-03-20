import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { detailedError, createDetail } from './errors.js';
import User from '../models/User.js';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateField = async (value, fieldName) => {
  if (!value) {
    return createDetail(fieldName, value, 'formValidation.required');
  }
  switch (fieldName) {
    case 'email':
      if (!emailRegex.test(value)) {
        return createDetail(fieldName, value, 'formValidation.emailFormat');
      }
      if (await User.findOne({ email: value })) {
        return createDetail(fieldName, value, 'formValidation.unique');
      }
      break;
    case 'username':
      if (!/^[a-zA-Z0-9]+$/.test(value)) {
        return createDetail(fieldName, value, 'formValidation.nameFormat');
      }
      if (value.length < 2) {
        return createDetail(fieldName, value, 'formValidation.minLen');
      }
      if (await User.findOne({ username: value })) {
        return createDetail(fieldName, value, 'formValidation.unique');
      }
      break;
    case 'language':
      if (!['en', 'fi', 'ru', 'de'].includes(value)) {
        return createDetail(fieldName, value, 'formValidation.notFound');
      }
      break;
    case 'userId':
      if (!/^[0-9a-fA-F]{24}$/.test(value)) {
        return createDetail(fieldName, value, 'formValidation.notValid');
      }
      if (!(await User.findById(value))) {
        return createDetail(fieldName, value, 'formValidation.notFound');
      }
      break;
    default:
      if (!/^[a-zA-Z0-9 ]+$/.test(value)) {
        return createDetail(fieldName, value, 'formValidation.nameFormat');
      }
      if (value.length < 2) {
        return createDetail(fieldName, value, 'formValidation.minLen');
      }
  }
  return '';
};

const validatePasswords = (password, confirmPassword) => {
  if (!password) {
    return createDetail('password', password, 'formValidation.required');
  }
  if (!confirmPassword) {
    return createDetail('confirmPassword', confirmPassword, 'formValidation.required');
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/.test(password)) {
    return createDetail('password', '********', 'formValidation.passwordFormat');
  }
  if (password !== confirmPassword) {
    return createDetail('confirmPassword', '*******', 'formValidation.pwNoMatch');
  }
  return '';
};

const validateResetToken = async (token, userId) => {
  if (!token) {
    return createDetail('resetToken', token, 'formValidation.required');
  }

  const user = await User.findById(userId);
  if (user.token !== token) {
    return createDetail('resetToken', token, 'formValidation.notValid');
  }
  return '';
};

const validateUserCreation = async (req, res, next) => {
  const {
    username,
    email,
    firstname,
    language,
    lastname,
    password,
    confirmPassword,
  } = req.body;
  let errors = [];

  errors.push(await validateField(username, 'username'));
  errors.push(await validateField(email, 'email'));
  errors.push(await validateField(lastname, 'lastname'));
  errors.push(await validateField(language, 'language'));
  errors.push(await validateField(firstname, 'firstname'));
  errors.push(validatePasswords(password, confirmPassword));
  errors = errors.filter((error) => error);

  if (errors.length > 0) {
    throw detailedError(errors);
  }

  next();
};

const validatePasswordReset = async (req, res, next) => {
  const {
    password, confirmPassword, resetToken, userId,
  } = req.body;
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

const validatePasswordAndEmail = async (email, password) => {
  if (!password) {
    return createDetail('password', password, 'formValidation.required');
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/.test(password)) {
    return createDetail('password', '********', 'formValidation.passwordFormat');
  }
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return createDetail('email', email, 'formValidation.invalidCredentials');
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return createDetail('password', '********', 'formValidation.invalidCredentials');
  }
  return '';
};

const validateEmailFormat = (email) => {
  if (!email) {
    return createDetail('email', email, 'formValidation.required');
  }
  if (!emailRegex.test(email)) {
    return createDetail('email', email, 'formValidation.emailFormat');
  }
  return '';
};

const validateUserUpdate = async (req, res, next) => {
  const {
    username,
    lastname,
    firstname,
    language,
    email,
    oldPassword,
    password,
    confirmPassword,
  } = req.body;
  const { userId } = req.params;
  let errors = [];
  const userIdError = await validateField(userId, 'userId');
  errors.push(userIdError);

  if (!userIdError) {
    if (password || confirmPassword) {
      if (!oldPassword) {
        errors.push(createDetail('oldPassword', '', 'formValidation.required'));
      } else if (!(await isPasswordValid(oldPassword, userId))) {
        errors.push(createDetail('oldPassword', '******', 'formValidation.wrongPw'));
      }
      errors.push(validatePasswords(password, confirmPassword));
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
    if (language) {
      errors.push(await validateField(language, 'language'));
    }
  }

  errors = errors.filter((error) => error);

  if (errors.length > 0) {
    throw detailedError(errors);
  }

  next();
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  let errors = [];

  errors.push(validateEmailFormat(email));
  errors.push(await validatePasswordAndEmail(email, password));
  errors = errors.filter((error) => error);

  if (errors.length > 0) {
    throw detailedError(errors);
  }

  next();
};
const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  let errors = [];

  errors.push(validateEmailFormat(email));

  if (!(await User.findOne({ email }))) {
    const notFound = createDetail('email', email, 'formValidation.notFound');
    errors.push(notFound);
  }
  errors = errors.filter((error) => error);
  if (errors.length > 0) {
    throw detailedError(errors);
  }

  next();
};

const validateToken = async (req, res, next) => {
  const { token } = req.params;
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decode) => {
      if (!err) {
        const user = await User.findById(decode.id);
        if (user) {
          return next();
        }
      }
      return res.status(401).json({ error: 'Unauthorized user!' });
    });
  } else {
    return res.status(401).json({ error: 'Unauthorized user!' });
  }
  return '';
};

export default {
  validateUserCreation,
  validateUserUpdate,
  validatePasswordReset,
  validateLogin,
  validateEmail,
  validateToken,
};
