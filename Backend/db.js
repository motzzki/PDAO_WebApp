const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Create a pool of connections
const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  })
  .promise();

module.exports = pool;
