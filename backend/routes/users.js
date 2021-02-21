import express from 'express';

import userController from '../controllers/userController.js';
import inputValidator from '../utilities/inputValidator.js';
import middleware from '../utilities/middleware.js';

const userRoute = express.Router();

// TO DO: // THIS ROUTE DOES NOT COMPLY WITH API SPECS, HERE FOR COMPATIBILITY, WILL BE DEPRECATED
userRoute.get('/', userController.getUsers);

userRoute.post('/', inputValidator.validateUserCreation, userController.addUser);

userRoute.patch('/', inputValidator.validatePasswordReset, userController.updatePassword);

userRoute.get('/:userId', middleware.authRequired, userController.getUserInfo);

userRoute.patch(
  '/:userId',
  middleware.authRequired,
  inputValidator.validateUserUpdation,
  userController.updateUser,
);

export default userRoute;
