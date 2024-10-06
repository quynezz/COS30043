const pool = require('../routes/db');
const { comparePassword } = require('../helpers/auth');

const registerUser = async (name, email, password) => {
  try {
    const connection = await pool.getConnection();
    console.log("Inserting user:", { name, email, password });
    await connection.query('INSERT INTO userinfo (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
    console.log("User inserted successfully");
    connection.release();
    return { success: true };
  } catch (error) {
    console.error('Error registering user:', error);
    return { error: 'An error occurred during registration' };
  }
};

const loginUser = async (email, password) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM userinfo WHERE BINARY Email = ?', [email]);
    connection.release();

    if (rows.length === 0) {
      return { error: 'No user found with this email' };
    }

    const user = rows[0];

    if (!user.password) {
      return { error: 'No password set for this user' };
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return { error: 'Incorrect password' };
    }

    return { success: true, user };
  } catch (error) {
    console.error('Error logging in user:', error);
    return { error: 'An error occurred during login' };
  }
};

module.exports = {
  registerUser,
  loginUser,
};
