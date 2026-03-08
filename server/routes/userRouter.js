import express from 'express';
import {authenticateToken} from '../middlewares/authentication.js';
import {
  getUsers,
  postUser,
  postLogin,
  getMe,
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.route('/')
.get(authenticateToken, getUsers)
.post(postUser);

userRouter.post('/login', postLogin);

userRouter.get('/me', authenticateToken, getMe);

export default userRouter;
