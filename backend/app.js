/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';

import User from './models/User.js';
import Movie from './models/Movie.js';

import movieListUtils from './utilities/fetchMovieList.js';

const app = express();

// connect to Mongo daemon
mongoose
  .connect('mongodb://mongo:27017/hypertube', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json({ limit: 100000000 }));

app.get('/', (req, res) => {
  console.log('we are here');
  res.json('Hi from backend!!!');
});

app.get('/users', async (req, res) => {
  console.log('in get users');
  const users = await User.find();
  res.json({ users });
});

app.post('/users', (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: `${req.body.username}1@example.com`,
    username: req.body.username,
    password: 'some password',
  });
  newUser
    .save()
    .then(() => res.sendStatus(201))
    .catch((e) => res.status(400).json(e));
});

app.get('/movies', async (req, res) => {
  const page = req.query.page || 1;
  res.json(await movieListUtils.fetchYTSMovieList(page));
});

app.post('/movies', async (req, res) => {
  const newMovie = new Movie({
    serverLocation: req.body.location,
  });
  console.log(newMovie);
  try {
    await newMovie.save();
    res.sendStatus(201);
  } catch (e) {
    res.status(400).json(e);
  }
});

// Get document, or throw exception on error
let doc;
try {
  doc = yaml.load(fs.readFileSync('./docs/docs.yaml', 'utf8'));
} catch (e) {
  console.log(e);
}

app.use(swaggerUi.serve);
app.get('/docs', swaggerUi.setup(doc));

export default app;
