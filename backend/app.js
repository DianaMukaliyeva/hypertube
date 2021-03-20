import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import movieRoute from './routes/movies.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';

import job from './utilities/cron.js';
import database from './utilities/database.js';
import middleware from './utilities/middleware.js';
import swaggerDocs from './utilities/swagger.js';

const app = express();

database.connect();
app.use(cors());
app.use(express.json({ limit: 100000000 }));

app.use(middleware.authentication);

app.use('/api/auth', authRoute);
app.use('/api/movies', movieRoute);
app.use('/api/users', userRoute);
app.use('/docs', swaggerDocs);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);
job.start();

export default app;
