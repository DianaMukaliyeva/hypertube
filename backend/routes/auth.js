import express from 'express';

import authController from '../controllers/authController.js';
import inputValidator from '../utilities/inputValidator.js';

const authRoute = express.Router();

authRoute.post('/login', inputValidator.validateLogin, authController.login);

authRoute.post('/recoverylink', inputValidator.validateEmail, authController.recoveryEmail);

authRoute.get('/google', authController.googleURL);

authRoute.get('/google/callback', authController.googleCallback);

authRoute.get('/token/:key', authController.getUserToken);

authRoute.get('/42', authController.fortytwoURL);

authRoute.get('/42/callback', authController.fortytwoCallback);

export default authRoute;
