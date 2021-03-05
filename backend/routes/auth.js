import express from 'express';

import authController from '../controllers/authController.js';
import inputValidator from '../utilities/inputValidator.js';

const authRoute = express.Router();

authRoute.post('/login', inputValidator.validateLogin, authController.login);

authRoute.post('/recoverylink', inputValidator.validateEmail, authController.recoveryEmail);

authRoute.get('/google/url', authController.googleURL);

authRoute.get('/google/callback', authController.googleCallback);

authRoute.get('/google', authController.googleUser);

export default authRoute;
