import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import diaryRouter from './routes/diaryRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

// Päiväkirja API-reitit
app.use('/api/diary', diaryRouter);

// Käyttäjien API-reitit
app.use('/api/users', userRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
