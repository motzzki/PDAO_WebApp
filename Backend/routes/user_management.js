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

  // Generate password from birthdate
  const passwordGenerate = generatePasswordFromDOB(birthdate); // Use the DOB to generate the password

  try {
    // Check if the username already exists in the database
    const [rows] = await pool.query(
      "SELECT * FROM employees WHERE username = ?",
      [username]
    );

    if (rows.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the generated password
    const hashedPassword = await bcrypt.hash(
      passwordGenerate, // Hash the generated password here
      parseInt(process.env.SALT_ROUNDS)
    );

    // Insert the new user into the database
    await pool.query(
      "INSERT INTO employees (firstname, middlename, lastname, username, password, gender, birthdate, contactnum, email, user_group ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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

    // Send response with just the username and unhashed password
    res.status(201).json({
      message: "User registered successfully",
      username: username, // Send the username
      password: passwordGenerate, // Send the unhashed password (not recommended for production)
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/reset_password", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const [user] = await pool.query("SELECT * FROM tblusers WHERE userId = ?", [
      userId,
    ]);

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const birthDate = user[0].date_of_birth;
    if (!birthDate) {
      return res.status(400).json({ error: "User does not have a birth date" });
    }

    // Format birth date (ensure it's a string like 'YYYY-MM-DD')
    const formattedBirthDate = generatePasswordFromDOB(birthDate);

    // Hash the birth date
    const hashedPassword = await bcrypt.hash(
      formattedBirthDate,
      parseInt(process.env.SALT_ROUNDS)
    );

    // Update the password in the database
    await pool.query("UPDATE tblusers SET password = ? WHERE userId = ?", [
      hashedPassword,
      userId,
    ]);

    res
      .status(200)
      .json({ message: "Password reset to birthday successfully" });
  } catch (error) {
    console.error("Error resetting password to birthday:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/reset_employee", async (req, res) => {
  const { employeeId } = req.body;

  if (!employeeId) {
    return res.status(400).json({ error: "Employee ID is required" });
  }

  try {
    const [user] = await pool.query(
      "SELECT * FROM employees WHERE employeeId = ?",
      [employeeId]
    );

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const birthDate = user[0].birthdate;
    if (!birthDate) {
      return res
        .status(400)
        .json({ error: "Employee does not have a birth date" });
    }

    // Format birth date (ensure it's a string like 'YYYY-MM-DD')
    const formattedBirthDate = generatePasswordFromDOB(birthDate);

    // Hash the birth date
    const hashedPassword = await bcrypt.hash(
      formattedBirthDate,
      parseInt(process.env.SALT_ROUNDS)
    );

    // Update the password in the database
    await pool.query("UPDATE employees SET password = ? WHERE employeeId = ?", [
      hashedPassword,
      employeeId,
    ]);

    res
      .status(200)
      .json({ message: "Password reset to birthday successfully" });
  } catch (error) {
    console.error("Error resetting password to birthday:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/change_password", async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  // Validate input
  if (!username || !oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ error: "Username, old password, and new password are required" });
  }

  try {
    // Check if the user exists
    const [user] = await pool.query(
      "SELECT * FROM employees WHERE username = ?",
      [username]
    );

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare old password with stored hash
    const passwordMatch = await bcrypt.compare(oldPassword, user[0].password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect old password" });
    }

    const hashedNewPassword = await bcrypt.hash(
      newPassword,
      parseInt(process.env.SALT_ROUNDS)
    );

    // Update password in the database
    await pool.query("UPDATE employees SET password = ? WHERE username = ?", [
      hashedNewPassword,
      username,
    ]);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

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
         ON user_groups.group_id = employees.user_group
         WHERE employees.flag = 1`
    );
    conn.release(); // Release the connection before sending the response
    res.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Error fetching employees" });
  }
});

router.get("/users-employees", async (req, res) => {
  const usersQuery = `
    SELECT  userId, first_name, last_name, accountId, contact_num, email, flagUser
    FROM tblusers
  `;
  const employeesQuery = `
    SELECT employeeId, firstname, lastname, username, contactnum, email, flag
    FROM employees
    WHERE user_group = 2
  `;

  let connection;

  try {
    connection = await pool.getConnection();

    const [usersResults] = await connection.query(usersQuery); // Fetch users data
    const [employeesResults] = await connection.query(employeesQuery); // Fetch employees data

    const combinedResults = {
      users: usersResults,
      employees: employeesResults,
    };

    return res.status(200).json(combinedResults);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Failed to fetch data" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

router.post("/toggleStatus", async (req, res) => {
  const { id, flag } = req.body;

  if (id === undefined || flag === undefined) {
    return res
      .status(400)
      .json({ message: "Invalid request. Missing parameters." });
  }

  const newStatus = flag ? 0 : 1;

  try {
    const queries = [
      {
        table: "tblusers",
        column: "flagUser",
        condition: "userId",
      },
      {
        table: "employees",
        column: "flag",
        condition: "employeeId",
      },
    ];

    let updated = false;

    for (const { table, column, condition } of queries) {
      const updateQuery = `UPDATE ${table} SET ${column} = ? WHERE ${condition} = ?`;
      const [result] = await pool.query(updateQuery, [newStatus, id]);

      if (result.affectedRows > 0) {
        updated = true;
      }
    }

    if (updated) {
      return res.status(200).json({ message: "Status updated successfully." });
    }

    res.status(404).json({ message: "No matching record found." });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Failed to update status." });
  }
});

router.get("/current-cashgift", async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT u.userId, u.first_name, u.middle_name, u.last_name, u.gender, u.date_of_birth, 
       IFNULL(c.claim_tag, 0) AS claim_tag
      FROM tblusers u
      LEFT JOIN claim_table c ON u.userId = c.user_id
      WHERE (
              (MONTH(u.date_of_birth) = MONTH(CURDATE()) AND DAY(u.date_of_birth) >= DAY(CURDATE())) 
              OR MONTH(u.date_of_birth) = MONTH(DATE_ADD(CURDATE(), INTERVAL 1 MONTH))
              OR MONTH(u.date_of_birth) = MONTH(DATE_ADD(CURDATE(), INTERVAL 2 MONTH))
            )
      AND YEAR(u.date_of_birth) <= YEAR(CURDATE())
      ORDER BY MONTH(u.date_of_birth), DAY(u.date_of_birth) ASC;`
    );

    // If there are no birthdays in the current month, return an empty response
    if (result.length === 0) {
      return res.json({
        birthdays: [],
        totalClaimed: 0,
        totalUnclaimed: 0,
      });
    }

    // Get the userIds from the first query result to filter the claims
    const userIds = result.map((user) => user.userId);

    // Query to get the total claimed count for users with birthdays in the current month
    const [claimedCount] = await pool.query(
      `SELECT COUNT(*) as claimed_count
       FROM claim_table
       WHERE user_id IN (?) AND claim_tag = 1`,
      [userIds] // Pass userIds as an array to the query
    );

    // Query to get the total unclaimed count for users with birthdays in the current month
    const [unclaimedCount] = await pool.query(
      `SELECT COUNT(*) as unclaimed_count
       FROM claim_table
       WHERE user_id IN (?) AND claim_tag = 0`,
      [userIds] // Pass userIds as an array to the query
    );

    // Send the results including both the birthdays and the claim totals
    res.json({
      birthdays: result,
      totalClaimed: claimedCount[0].claimed_count,
      totalUnclaimed: unclaimedCount[0].unclaimed_count,
    });
  } catch (error) {
    console.error("Error fetching birthdays this month:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/claim", async (req, res) => {
  const { userId, claimType } = req.body; // Expecting { userId, claimType } from the request body

  try {
    // Check if the user has already claimed the gift
    const [existingClaim] = await pool.query(
      `SELECT * FROM claim_table WHERE user_id = ? AND claim_type = ?`,
      [userId, claimType]
    );

    if (existingClaim.length > 0) {
      return res
        .status(400)
        .json({ message: "User has already claimed this gift." });
    }

    // Insert new claim with claim_tag set to 1 (claimed)
    const [result] = await pool.query(
      `INSERT INTO claim_table (user_id, claim_type, claim_tag) VALUES (?, ?, 1)`,
      [userId, claimType]
    );

    res
      .status(201)
      .json({ message: "Claim successful!", claimId: result.insertId });
  } catch (error) {
    console.error("Error claiming the gift:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/current-birthday", async (req, res) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const query = `
     SELECT u.userId, u.first_name, u.middle_name, u.last_name, u.gender, u.date_of_birth, 
       IFNULL(c.claim_tag, 0) AS claim_tag
      FROM tblusers u
      LEFT JOIN claim_table c ON u.userId = c.user_id
      WHERE (
              (MONTH(u.date_of_birth) = MONTH(CURDATE()) AND DAY(u.date_of_birth) >= DAY(CURDATE())) 
              OR MONTH(u.date_of_birth) = MONTH(DATE_ADD(CURDATE(), INTERVAL 1 MONTH))
              OR MONTH(u.date_of_birth) = MONTH(DATE_ADD(CURDATE(), INTERVAL 2 MONTH))
            )
      AND YEAR(u.date_of_birth) <= YEAR(CURDATE())
      ORDER BY MONTH(u.date_of_birth), DAY(u.date_of_birth) ASC;
    `;

    const [rows] = await conn.query(query);
    const totalClaimed = rows.filter((user) => user.claim_tag === 1).length;
    const totalUnclaimed = rows.filter((user) => user.claim_tag === 0).length;

    res.json({
      message: "Current birthdays fetched successfully",
      birthdays: rows,
      totalClaimed,
      totalUnclaimed,
    });
  } catch (error) {
    console.error("Error fetching birthdays:", error);
    res.status(500).json({
      message: "Failed to load birthdays",
      error: error.message,
    });
  } finally {
    if (conn) conn.release();
  }
});

router.get("/claimed-dates", async (req, res) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const query = `
                SELECT 
                u.userId, 
                u.first_name, 
                u.last_name, 
                IFNULL(c.claimed_date, 'Not Claimed') AS claimed_date, 
                IFNULL(c.claim_tag, 0) AS claim_tag
              FROM tblusers u
              LEFT JOIN claim_table c 
                ON u.userId = c.user_id
              WHERE (
                (MONTH(u.date_of_birth) = MONTH(CURDATE()) AND DAY(u.date_of_birth) >= DAY(CURDATE())) 
                OR MONTH(u.date_of_birth) = MONTH(DATE_ADD(CURDATE(), INTERVAL 1 MONTH))
                OR MONTH(u.date_of_birth) = MONTH(DATE_ADD(CURDATE(), INTERVAL 2 MONTH))
              )
              ORDER BY c.claimed_date ASC;
    `;

    const [claimedDates] = await conn.query(query);
    res.json({
      message: "Claimed and Unclaimed dates fetched successfully",
      claimedDates,
    });
  } catch (error) {
    console.error("Error fetching claimed dates:", error);
    res.status(500).json({
      message: "Failed to load claimed dates",
      error: error.message,
    });
  } finally {
    if (conn) conn.release();
  }
});

router.get("/user-feedbacks", async (req, res) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const query = `
      SELECT
        user_feedbacks.feedbackId,
        user_feedbacks.userId,
        tblUsers.accountId,         -- Fetching the username
        user_feedbacks.question1,
        user_feedbacks.question2,
        user_feedbacks.question3,
        user_feedbacks.question4,
        user_feedbacks.question5,
        user_feedbacks.suggestion
      FROM user_feedbacks
      JOIN tblUsers ON user_feedbacks.userId = tblUsers.userId;
    `;

    const [user_feedbacks] = await conn.query(query);
    res.json({
      message: "User Feedbacks Fetched Successfully.",
      user_feedbacks,
    });
  } catch (error) {
    console.error("Error fetching user feedbacks:", error);
    res.status(500).json({
      message: "Failed to load user feedbacks",
      error: error.message,
    });
  } finally {
    if (conn) conn.release();
  }
});

function generatePasswordFromDOB(dob) {
  const date = new Date(dob);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure month is always two digits
  const day = String(date.getDate()).padStart(2, "0"); // Ensure day is always two digits
  return `${year}${month}${day}`; // Returns password in the format YYYYMMDD
}

export default router;
