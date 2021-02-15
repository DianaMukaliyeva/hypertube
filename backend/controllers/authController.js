import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const login = async (req, res, next) => {
  console.log('body', req.body);
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  const passwordCorrect = user === null ? false : await bcrypt.compare(password, password);

  if (!(user && passwordCorrect)) {
    console.log('INVALID username or password');
    //   Throw error
    //   error: 'invalid username or password',
  }
  const userForToken = {
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  console.log({ token });

  res.status(200).json({ token });
};

export default {
  login,
};
