import express from 'express';

import userController from '../controllers/userController.js';
import inputValidator from '../utilities/inputValidator.js';
import middleware from '../utilities/middleware.js';

const userRoute = express.Router();

userRoute.post('/', inputValidator.validateUserCreation, userController.addUser);

userRoute.patch('/', inputValidator.validatePasswordReset, userController.updatePassword);

userRoute.get('/:userId', middleware.authRequired, userController.getUserInfo);

userRoute.patch(
  '/:userId',
  middleware.authRequired,
  inputValidator.validateUserUpdate,
  userController.updateUser,
);

export default userRoute;
