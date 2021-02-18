import express from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../utilities/authMiddleware.js';
import middleware from '../utilities/middleware.js';

const authRoute = express.Router();

authRoute.post('/login', middleware.validateLogin, authController.login);

authRoute.get('/test', authMiddleware.authRequired, authController.test);

export default authRoute;
