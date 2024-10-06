const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
const cookieParser = require('cookie-parser');
const pool = require('./routes/db'); // Import the connection pool

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true,
}));

app.options('*', cors());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Route to fetch subjectinfo data
app.get('/api/subjectinfo', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM subjectinfo');
    connection.release();
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching subjectinfo:', error);
    res.status(500).json({ error: 'An error occurred while fetching subjectinfo' });
  }
});

// Route to check if a unit code exists
app.get('/api/check/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT COUNT(*) AS count FROM subjectinfo WHERE Code = ?', [code]);
    connection.release();
    const exists = rows[0].count > 0;
    res.status(200).json({ exists });
  } catch (error) {
    console.error('Error checking unit existence:', error);
    res.status(500).json({ error: 'An error occurred while checking unit existence' });
  }
});

// Route to insert a new unit
app.post('/api/insert', async (req, res) => {
  const { code, description, cp, type } = req.body;
  try {
    const connection = await pool.getConnection();
    const query = 'INSERT INTO subjectinfo (Code, Description, Cp, Type) VALUES (?, ?, ?, ?)';
    await connection.query(query, [code, description, cp, type]);
    connection.release();
    res.status(201).json({ message: 'Unit inserted successfully' });
  } catch (error) {
    console.error('Error inserting unit:', error);
    res.status(500).json({ error: 'An error occurred while inserting the unit' });
  }
});

// Route to update an existing unit
app.put('/api/update/:code', async (req, res) => {
  const { code } = req.params;
  const { description, cp, type } = req.body;
  try {
    const connection = await pool.getConnection();
    const query = 'UPDATE subjectinfo SET Description = ?, Cp = ?, Type = ? WHERE Code = ?';
    await connection.query(query, [description, cp, type, code]);
    connection.release();
    res.status(200).json({ message: 'Unit updated successfully' });
  } catch (error) {
    console.error('Error updating unit:', error);
    res.status(500).json({ error: 'An error occurred while updating the unit' });
  }
});

// Route to delete a unit
app.delete('/api/delete/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const connection = await pool.getConnection();
    // Check if the unit exists
    const [rows] = await connection.query('SELECT COUNT(*) AS count FROM subjectinfo WHERE Code = ?', [code]);
    if (rows[0].count === 0) {
      connection.release();
      return res.status(404).json({ message: 'Unit does not exist. Cannot delete.' });
    }
    // Delete the unit
    const query = 'DELETE FROM subjectinfo WHERE Code = ?';
    await connection.query(query, [code]);
    connection.release();
    res.status(200).json({ message: 'Unit deleted successfully' });
  } catch (error) {
    console.error('Error deleting unit:', error);
    res.status(500).json({ error: 'An error occurred while deleting the unit' });
  }
});

app.get('/api/check-user', async (req, res) => {
  const { name, email } = req.query;
  try {
    const connection = await pool.getConnection();

    // Check if username exists
    const [userRows] = await connection.query('SELECT COUNT(*) AS count FROM userinfo WHERE name = ?', [name]);
    const usernameExists = userRows[0].count > 0;

    // Check if email exists
    const [emailRows] = await connection.query('SELECT COUNT(*) AS count FROM userinfo WHERE Email = ?', [email]);
    const emailExists = emailRows[0].count > 0;

    connection.release();

    res.status(200).json({ exists: { username: usernameExists, email: emailExists } });
  } catch (error) {
    console.error('Error checking user existence:', error);
    res.status(500).json({ error: 'An error occurred while checking user existence' });
  }
});



// Auth routes (assuming they are defined in authRoutes.js or similar)
app.use('/', require('./routes/authRoutes'));

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
