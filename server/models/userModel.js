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
  selectUserByEmail: async (email) => {
    try {
      const sql = 'SELECT * FROM Users WHERE email=?';
      const params = [email];
      const [rows] = await db.query(sql, params);

      if (rows.length === 0) {
        return {error: 404, message: 'User not found'};
      }
      delete rows[0].password;
      return rows[0];
    } catch (error) {
      console.error('selectUserByEmail', error);
      return {error: 500, message: 'DB error'};
    }
  },
  selectUserById: async (userId) => {
    try {
      const sql = 'SELECT * FROM Users WHERE user_id=?'
      const params = [userId]
      const [rows] = await db.query(sql, params);

      if (rows.length === 0) {
        return {error: 404, message: 'UserId not found'};
      }
    } catch (error) {
      console.error('selectUserById', error);
      return {error: 500, message: 'DB error'}
    }
  },
};

export default UserModel;
