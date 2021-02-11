/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';

import movieRoute from './routes/movies.js';
import userRoute from './routes/users.js';

import middleware from './utilities/middleware.js';
import database from './utilities/database.js';

const app = express();
database.connect();

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

app.use('/api/movies', movieRoute);
app.use('/api/users', userRoute);

// Get document, or throw exception on error TODO: move this to /utilities
let doc;
try {
  doc = yaml.load(fs.readFileSync('./docs/docs.yaml', 'utf8'));
} catch (e) {
  console.log(e);
}

app.use(swaggerUi.serve);
app.get('/docs', swaggerUi.setup(doc));

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

export default app;
