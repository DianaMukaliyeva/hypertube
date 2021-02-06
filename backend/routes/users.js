import express from 'express';
import userController from '../controllers/userController.js';

const userRoute = express.Router();

userRoute.get('/', async (req, res, next) => {
  await userController.getUser(req, res, next);
});

userRoute.post('/', async (req, res, next) => {
  await userController.addUser(req, res, next);
});

export default userRoute;
