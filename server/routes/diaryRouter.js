import express from 'express';
import { createEntry, deleteEntry, getUserEntries } from '../controllers/diaryController.js';
import { authenticateToken } from '../middlewares/authentication.js';

const diaryRouter = express.Router();

diaryRouter.route('/')
.get(authenticateToken, getUserEntries)
.post(authenticateToken, createEntry);

diaryRouter.route('/:id')
.delete(authenticateToken, deleteEntry);

export default diaryRouter;
