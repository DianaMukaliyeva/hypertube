import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const login = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  const userForToken = {
    id: user.id,
    lang: user.language,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.json({ token });
};

// TO DO: remove test route
const test = async (req, res) => {
  res.status(200).json('success');
};

export default {
  login,
  test,
};
