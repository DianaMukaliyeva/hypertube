import express from 'express';

import userController from '../controllers/userController.js';
import midlleware from '../utilities/middleware.js';

const userRoute = express.Router();

// TO DO: // THIS ROUTE DOES NOT COMPLY WITH API SPECS, HERE FOR COMPATIBILITY, WILL BE DEPRECATED
userRoute.get('/', userController.getUsers);

userRoute.post('/', midlleware.validateUserCreation, userController.addUser);

userRoute.patch('/', userController.updatePassword);

// TO DO: when middlware will be ready uncomment line below and delete another
// userRoute.get('/:userId', midlleware.isAuthorized, userController.getUserInfo);
userRoute.get('/:userId', userController.getUserInfo);

userRoute.patch('/:userId', userController.updateUser); // TO DO: add middleware that user authorized

export default userRoute;
