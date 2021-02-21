/* eslint-disable no-console */
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

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

// eslint-disable-next-line consistent-return
const authentication = (req, res, next) => {
  const jwtSecret = 'process.env.SECRET';

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    jwt.verify(req.headers.authorization.split(' ')[1], jwtSecret, async (err, decode) => {
      if (err) {
        req.user = undefined;
      } else {
        const user = await User.findById(decode.id);
        req.user = user ? user.id : undefined;
      }
      return next();
    });
  } else {
    req.user = undefined;
    return next();
  }
};

const authRequired = async (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.json({ error: 'Unauthorized user!' });
};

export default {
  authRequired,
  authentication,
  errorHandler,
  unknownEndpoint,
};
