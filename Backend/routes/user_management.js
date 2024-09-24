import pool from "../db.js";
import express from "express";
import bcrypt from "bcrypt";
import { config } from "dotenv";

config();

const router = express.Router();

router.post("/register_user", async (req, res) => {
  const {
    firstname,
    middlename,
    lastname,
    contactnum,
    email,
    username,
    birthdate,
    gender,
    user_group,
  } = req.body;

  //   if (!username || !password || !role) {
  //     return res.status(400).json({ error: "All fields are required" });
  //   }

  const passwordGenerate = generatePassword();

  try {
    const [rows] = await pool.query(
      "SELECT * FROM employees WHERE username = ?",
      [username]
    );

    if (rows.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(
      passwordGenerate,
      parseInt(process.env.SALT_ROUNDS)
    );

    await pool.query(
      "INSERT INTO employees (firstname, middlename, lastname, username, password, gender, birthdate, contactnum, email, user_group) VALUES (?, ?, ?, ?, ?, ?,?, ?, ?, ?)",
      [
        firstname,
        middlename,
        lastname,
        username,
        hashedPassword,
        gender,
        birthdate,
        contactnum,
        email,
        user_group,
      ]
    );
    console.log(generatePassword);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

function generatePassword(length = 10) {
  const charset = "abcdefghijkmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ23456789";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

router.get("/get-employee", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [employees] = await conn.query(
      `SELECT 
           employeeId, 
           firstname, 
           middlename, 
           lastname, 
           username, 
           gender, 
           birthdate, 
           contactnum, 
           email, 
           group_name 
         FROM employees 
         JOIN user_groups 
         ON user_groups.group_id = employees.user_group`
    );
    conn.release(); // Release the connection before sending the response
    res.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Error fetching employees" });
  }
});

export default router;
