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

  const noNumbersRegex = /^[A-Za-z\s]+$/;
  if (
    !noNumbersRegex.test(first_name) ||
    !noNumbersRegex.test(middle_name) ||
    !noNumbersRegex.test(last_name) ||
    !noNumbersRegex.test(nationality) ||
    (occupation_name && !noNumbersRegex.test(occupation_name))
  ) {
    return res.status(400).json({
      error: "Names, nationality, and occupation cannot contain numbers.",
    });
  }

  const generatedPassword = generatePasswordFromDOB(date_of_birth);
  const hashedPassword = await bcrypt.hash(
    generatedPassword,
    parseFloat(process.env.SALT_ROUNDS)
  );
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const generateAccount = await generateAccountId();
    const createdAt = new Date();
    const expiredId = new Date(createdAt);
    expiredId.setFullYear(expiredId.getFullYear() + 5);

    const [userResult] = await connection.query(
      "INSERT INTO tblusers (first_name, middle_name, last_name, contact_num, email, accountId, password, age, gender, date_of_birth, blood_type, created_at, expired_id, nationality) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        first_name,
        middle_name,
        last_name,
        contact_num,
        email,
        generateAccount,
        hashedPassword,
        age,
        gender,
        date_of_birth,
        blood_type,
        createdAt,
        expiredId,
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
      accountId: generateAccount,
      password: generatedPassword, // Unhashed password shown to the user
    });
  } catch (error) {
    await connection.rollback();
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    connection.release();
  }
});

async function generateAccountId() {
  const connection = await pool.getConnection();

  const generatedAccountId =
    Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;

  await connection.beginTransaction();

  const [results] = await connection.query(
    `SELECT accountId FROM tblusers WHERE accountId = ?`,
    [generatedAccountId]
  );

  if (results?.length > 0) {
    return generateAccountId();
  }

  return generatedAccountId;
}

function generatePasswordFromDOB(dob) {
  const date = new Date(dob);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

// function generatePassword(length = 10) {
//   const charset = "abcdefghijkmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ23456789";

//   let password = "";
//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * charset.length);
//     password += charset[randomIndex];
//   }

//   return password;
// }
export default router;
