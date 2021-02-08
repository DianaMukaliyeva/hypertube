/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import movieRoute from './routes/movies.js';
import userRoute from './routes/users.js';

const app = express();

// connect to Mongo daemon
mongoose // TODO: async/await for these if possible, it's 2021 ;)
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

app.get('/test', (req, res) => {
  console.log('DO NOT DELETE me, Im here for the github action tests! for now...');
  res.status(200).json('test');
});

app.use('/movies', movieRoute);
app.use('/users', userRoute);

// Get document, or throw exception on error TODO: move this to /utilities
let doc;
try {
  doc = yaml.load(fs.readFileSync('./docs/docs.yaml', 'utf8'));
} catch (e) {
  console.log(e);
}

app.use(swaggerUi.serve);
app.get('/docs', swaggerUi.setup(doc));

export default app;
