import db from '../utils/database.js';

const UserModel = {
  findByUsername: async (username) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await db.execute(sql, [username]);
    return rows[0];
  },
  createUser: async (user) => {
    const {username, password, email} = user;
    const sql = `INSERT INTO Users (username, password, email)
                 VALUES (?, ?, ?)`;
    const params = [username, password, email];
    try {
      const result = await db.execute(sql, params);
      return {user_id: result[0].insertId};
    } catch (err) {
      console.error('error', err.message);
      return {error: err.message};
    }
  },
  listAllUsers: async () => {
    const sql = 'SELECT username, created_at FROM users';
    const [rows] = await db.execute(sql);
    return rows;
  },
};

export default UserModel;
