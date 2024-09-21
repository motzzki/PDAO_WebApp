import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import express from "express";
import { config } from "dotenv";

config();

const router = express.Router();

router.post("/register_pwd", async (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    contact_num,
    email,
    username,
    password,
    age,
    gender,
    date_of_birth,
    blood_type,
    nationality,
    occupation_name,
    disability_status,
    employment_status,
    educational_status,
    cause_status,
    house_address,
    barangay,
    civilStatus,
  } = req.body;

  if (
    !first_name ||
    !middle_name ||
    !last_name ||
    !contact_num ||
    !email ||
    !age ||
    !gender ||
    !date_of_birth ||
    !blood_type ||
    !nationality
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const generatedUsername =
      username || generateUsername(first_name, last_name);
    const generatedPassword = password || generatePassword();
    // const hashedPassword = await bcrypt.hash(
    //   password,
    //   parseInt(process.env.SALT_ROUNDS)
    // );

    const createdAt = new Date();

    const [userResult] = await connection.query(
      "INSERT INTO tblusers (first_name, middle_name, last_name, contact_num, email, username, password, age, gender, date_of_birth, blood_type, created_at, nationality) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        first_name,
        middle_name,
        last_name,
        contact_num,
        email,
        generatedUsername,
        generatedPassword,
        age,
        gender,
        date_of_birth,
        blood_type,
        createdAt,
        nationality,
      ]
    );

    const userId = userResult.insertId;

    await connection.query(
      "INSERT INTO disabilities (user_id, disability_status) VALUES (?,?)",
      [userId, disability_status]
    );

    await connection.query(
      "INSERT INTO tbl_occupations (user_id, occupation_name) VALUES (?,?)",
      [userId, occupation_name]
    );
    await connection.query(
      "INSERT INTO tbl_employment_status (user_id, employment_status) VALUES (?,?)",
      [userId, employment_status]
    );
    await connection.query(
      "INSERT INTO tbl_educational_background (user_id, educational_status) VALUES (?,?)",
      [userId, educational_status]
    );
    await connection.query(
      "INSERT INTO tbl_cause_of_disability (user_id, cause_status) VALUES (?,?)",
      [userId, cause_status]
    );
    await connection.query(
      "INSERT INTO tbladdress (user_id, house_address, barangay) VALUES (?,?,?)",
      [userId, house_address, barangay]
    );

    await connection.query(
      "INSERT INTO tbl_civilstatus (user_id, civilStatus) VALUES (?,?)",
      [userId, civilStatus]
    );

    await connection.commit();

    res.status(201).json({
      message: "User registered successfully",
      username: generatedUsername,
      password: generatedPassword,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    connection.release();
  }
});

function generateUsername(firstName, lastName) {
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNumber}`;
}

function generatePassword(length = 12) {
  const charset = "abcdefghijkmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ23456789";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

export default router;
