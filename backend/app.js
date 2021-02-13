/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';

import movieRoute from './routes/movies.js';
import userRoute from './routes/users.js';

import middleware from './utilities/middleware.js';
import database from './utilities/database.js';
import swaggerDocs from './utilities/swagger.js';

const app = express();

database.connect();
app.use(cors());
app.use(express.json({ limit: 100000000 }));

app.get('/test', (req, res) => {
  console.log('DO NOT DELETE me, Im here for the github action tests! for now...');
  res.status(200).json('test');
});

app.use('/api/movies', movieRoute);
app.use('/api/users', userRoute);
app.use('/docs', swaggerDocs);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

export default app;
