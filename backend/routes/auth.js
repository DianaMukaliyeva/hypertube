import express from 'express';

import authController from '../controllers/authController.js';
import middleware from '../utilities/middleware.js';
import inputValidator from '../utilities/inputValidator.js';

const authRoute = express.Router();

authRoute.post('/login', inputValidator.validateLogin, authController.login);

authRoute.post('/recoverylink', inputValidator.validateEmail, authController.recoveryEmail);

authRoute.get('/test', inputValidator.validateEmail, authController.recoveryEmail);

export default authRoute;
