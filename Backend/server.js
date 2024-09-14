const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

const pool = require("./db");

(async () => {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("MySQL Connected");
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
  }
})();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
