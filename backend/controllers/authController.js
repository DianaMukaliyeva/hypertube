import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  // const passwordCorrect = user === null ? false : await bcrypt.compare(password, password);
  const passwordCorrect = true;

  if (!(user && passwordCorrect)) {
    //   Throw error
    //   error: 'invalid username or password',
  } else {
    const userForToken = {
      id: user._id,
      lang: user.language,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    return res.status(200).json({ token });
  }
};

const test = async (req, res, next) => {
  return res.status(200).json('success');
};

export default {
  login,
  test,
};
