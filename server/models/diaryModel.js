import db from '../utils/database.js';

const DiaryModel = {
  createEntry: async (entry) => {
    const {user_id, entry_date, mood, sleep_hours, weight, notes} = entry;
    const sql = `INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes)
                 VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [user_id, entry_date, mood, weight, sleep_hours, notes];
    try {
      const result = await db.execute(sql, params);
      return {entry_id: result[0].insertId};
    } catch (err) {
      console.error('error', err.message);
      return {error: err.message};
    }
  },
  getEntriesByUserId: async (user_id) => {
    const sql =
      'SELECT * FROM DiaryEntries WHERE user_id = ? ORDER BY entry_date DESC';
    const [rows] = await db.execute(sql, [user_id]);
    return rows;
  },
  getEntryById: async (entry_id) => {
    const sql = 'SELECT * FROM DiaryEntries WHERE id = ?';
    const [rows] = await db.execute(sql, [entry_id]);
    return rows[0];
  },
  deleteEntryById: async (entry_id, user_id) => {
    const sql = 'DELETE FROM DiaryEntries WHERE entry_id = ? AND user_id = ?';
    const params = [entry_id, user_id];
    try {
      const [result] = await db.execute(sql, params);

      if (result.affectedRows === 0) {
        return {error: 'No entry found with that ID'};
      }

      return {message: `Entry ${entry_id} deleted successfully`};
    } catch (err) {
      console.error('error', err.message);
      return {error: err.message};
    }
  },
};

export default DiaryModel;
