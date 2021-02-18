import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authentication = async (req, res, next) => {
  const jwtSecret = process.env.SECRET;

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    jwt.verify(req.headers.authorization.split(' ')[1], jwtSecret, async (err, decode) => {
      if (err) {
        req.user = undefined;
      } else {
        const user = await User.findOne({ id: decode.id });
        req.user = user ? user.id : undefined;
      }
    });
  } else {
    req.user = undefined;
  }
  return next();
};

const authRequired = async (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.json({ error: 'Unauthorized user!' });
};

export default {
  authentication,
  authRequired,
};
