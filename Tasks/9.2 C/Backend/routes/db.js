const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'ngocquyen',
});

pool.getConnection()
  .then(connection => {
    console.log("Database connected successfully");
    connection.release();
  })
  .catch(error => {
    console.error("Database connection failed:", error);
  });

module.exports = pool;
