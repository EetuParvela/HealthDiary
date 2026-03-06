import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import promisePool, {testConnection} from './db-test.js';
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  await testConnection();
});

app.post('/api/entry', async (req, res) => {
  const {entry_date, mood_score, notes} = req.body;

  try {
    const sql =
      'INSERT INTO mood_entries (entry_date, mood_score, notes) VALUES (?, ?, ?)';

    const [result] = await promisePool.query(sql, [
      entry_date,
      mood_score,
      notes,
    ]);

    res.status(201).json({
      message: 'Entry saved successfully',
      id: result.insertId,
    });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});
