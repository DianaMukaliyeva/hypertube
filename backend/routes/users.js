import express from 'express';

import userController from '../controllers/userController.js';
import middleware from '../utilities/middleware.js';

const userRoute = express.Router();

// TO DO: // THIS ROUTE DOES NOT COMPLY WITH API SPECS, HERE FOR COMPATIBILITY, WILL BE DEPRECATED
userRoute.get('/', userController.getUsers);

userRoute.post('/', middleware.validateUserCreation, userController.addUser);

userRoute.patch('/', middleware.validatePasswordReset, userController.updatePassword);

// TO DO: when middlware will be ready uncomment line below and delete another
// userRoute.get('/:userId', midlleware.isAuthorized, userController.getUserInfo);
userRoute.get('/:userId', userController.getUserInfo);

// TO DO: when middlware will be ready uncomment line below and delete another
// userRoute.patch(
//   '/:userId',
//   midlleware.isAuthorized,
//   midlleware.validateUserUpdate,
//   userController.updateUser,
// );
userRoute.patch('/:userId', middleware.validateUserUpdation, userController.updateUser);

export default userRoute;
