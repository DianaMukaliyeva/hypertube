import express from 'express';

import userController from '../controllers/userController.js';
import midlleware from '../utilities/middleware.js';

const userRoute = express.Router();

// TO DO: // THIS ROUTE DOES NOT COMPLY WITH API SPECS, HERE FOR COMPATIBILITY, WILL BE DEPRECATED
userRoute.get('/', userController.getUsers);

userRoute.post('/', midlleware.validateUserCreation, userController.addUser);

userRoute.patch('/', userController.updatePassword);

userRoute.get('/:userId', userController.getUserInfo); // TO DO: add middleware that user authorized

userRoute.patch('/:userId', userController.updateUser); // TO DO: add middleware that user authorized

export default userRoute;
