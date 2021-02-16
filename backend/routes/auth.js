import express from 'express';
import authController from '../controllers/authController.js';
import middleware from '../utilities/authMiddleware.js';

const authRoute = express.Router();

authRoute.post('/login', authController.login);

authRoute.get('/test', middleware.authRequired, authController.test);

export default authRoute;
