import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import path from 'path';

import movieRoute from './routes/movies.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';

// import job from './utilities/cron.js';
import database from './utilities/database.js';
import middleware from './utilities/middleware.js';
// import swaggerDocs from './utilities/swagger.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

database.connect();
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(express.json({ limit: 100000000 }));

app.use(middleware.authentication);

app.use('/api/auth', authRoute);
app.use('/api/movies', movieRoute);
app.use('/api/users', userRoute);
// app.use('/docs', swaggerDocs);

app.get('*', (req, res) => {
  console.log('we are here');
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);
// job.start();

export default app;
