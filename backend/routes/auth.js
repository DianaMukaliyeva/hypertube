import express from 'express';
import authController from '../controllers/authController.js';

const authRoute = express.Router();

authRoute.post('/login', async (req, res, next) => {
  await authController.login(req, res, next);
});

authRoute.get('/auth', async (req, res, next) => {
  res.json('auth');
});

export default authRoute;
