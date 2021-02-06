import User from '../models/User.js';

const getUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (err) { next(err); }
};

const addUser = async (req, res, next) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: `${req.body.username}1@example.com`,
    username: req.body.username,
    password: 'some password',
  });
  newUser // TODO: maybe switch to async/await and try/catch for this?
    .save()
    .then(() => res.sendStatus(201))
    .catch((e) => next(e));
};

export default {
  getUser,
  addUser,
};
