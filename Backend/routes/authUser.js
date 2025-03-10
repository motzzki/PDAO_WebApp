import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import express from "express";

const router = express.Router();

import { config } from "dotenv";

config();

router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE employees = ?", [
      username,
    ]);

    if (rows.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    await pool.query(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, hashedPassword, role]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const [rows] = await pool.query(
//       "SELECT * FROM employees WHERE username = ?",
//       [username]
//     );

//     if (rows.length === 0) {
//       return res.status(400).json({ error: "Invalid username or password" });
//     }

//     const user = rows[0];
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(400).json({ error: "Invalid username or password" });
//     }

//     const accessToken = jwt.sign(
//       {
//         id: user.id,
//         first_name: user.first_name,
//         username: user.username,
//         // role: user.role,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     const refreshToken = jwt.sign(
//       {
//         id: user.id,
//         first_name: user.first_name,
//         username: user.username,
//         // role: user.role,
//       },
//       process.env.JWT_REFRESH_SECRET,
//       { expiresIn: "3d" }
//     );

//     console.log("User Logged In:", {
//       id: user.id,
//       first_name: user.first_name,
//       username: user.username,
//       role: user.role,
//     });

//     res.status(200).json({ accessToken, refreshToken });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const [employeeRows] = await pool.query(
//       `SELECT userId, accountId, password, user_group
//       FROM tblusers LEFT JOIN user_groups ON userId = group_id
//       WHERE accountId = ?`,
//       [username]
//     );

//     const [userRows] = await pool.query(
//       `SELECT employeeId, username, password, user_group
//        FROM employees
//        LEFT JOIN user_groups ON group_id = employeeId
//        WHERE username = ?`,
//       [username]
//     );

//     const user =
//       employeeRows.length > 0
//         ? employeeRows[0]
//         : userRows.length > 0
//         ? userRows[0]
//         : null;

//     if (!user) {
//       return res.status(400).json({ error: "Invalid username or password" });
//     }

//     let passwordMatch = false;

//     if (user.password.startsWith("$2b$")) {
//       passwordMatch = await bcrypt.compare(password, user.password);
//     } else {
//       passwordMatch = password === user.password;
//     }

//     if (!passwordMatch) {
//       return res.status(400).json({ error: "Invalid username or password" });
//     }

//     const accessToken = jwt.sign(
//       {
//         id: user.employeeId || user.userId,
//         username: user.username || user.accountId,
//         user_groups: user.user_group,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     const refreshToken = jwt.sign(
//       {
//         id: user.employeeId || user.userId,
//         username: user.username || user.accountId,
//         user_groups: user.user_group,
//       },
//       process.env.JWT_REFRESH_SECRET,
//       { expiresIn: "3d" }
//     );

//     res.status(200).json({
//       accessToken,
//       refreshToken,
//       user: {
//         id: user.employeeId || user.userId,
//         username: user.username || user.accountId,
//         user_groups: user.user_group,
//       },
//     });
//     console.log(user);
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [employeeRows] = await pool.query(
      `SELECT userId, accountId, password, user_group, flagUser 
      FROM tblusers LEFT JOIN user_groups ON userId = group_id 
      WHERE accountId = ?`,
      [username]
    );

    const [userRows] = await pool.query(
      `SELECT employeeId, username, password, user_group, flag 
       FROM employees 
       LEFT JOIN user_groups ON group_id = employeeId 
       WHERE username = ?`,
      [username]
    );

    const user =
      employeeRows.length > 0
        ? employeeRows[0]
        : userRows.length > 0
        ? userRows[0]
        : null;

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Check if the user or employee is inactive (flag = 0)
    if (
      (user.userId && user.flagUser === 0) ||
      (user.employeeId && user.flag === 0)
    ) {
      return res
        .status(400)
        .json({ error: "Your account is inactive. Please contact admin." });
    }

    let passwordMatch = false;

    if (user.password.startsWith("$2b$")) {
      passwordMatch = await bcrypt.compare(password, user.password);
    } else {
      passwordMatch = password === user.password;
    }

    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const accessToken = jwt.sign(
      {
        id: user.employeeId || user.userId,
        username: user.username || user.accountId,
        user_groups: user.user_group,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      {
        id: user.employeeId || user.userId,
        username: user.username || user.accountId,
        user_groups: user.user_group,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "3d" }
    );

    res.status(200).json({
      accessToken,
      refreshToken,
      user: {
        id: user.employeeId || user.userId,
        username: user.username || user.accountId,
        user_groups: user.user_group,
      },
    });
    console.log(user);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token required." });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      console.error("Invalid refresh token:", err.message);
      return res.status(403).json({ error: "Invalid refresh token." });
    }

    const accessToken = jwt.sign(
      {
        id: user.employeeId || user.userId,
        username: user.username || user.accountId,
        user_groups: user.user_group,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ accessToken });
  });
});

router.get("/get-employee/:Id", async (req, res) => {
  const { Id } = req.params;
  const conn = await pool.getConnection();
  try {
    const [employee] = await conn.query(
      `SELECT *, group_name 
         FROM employees 
         JOIN user_groups 
         ON user_groups.group_id = employees.user_group
         WHERE employeeId = ?`,
      [Id]
    );

    if (employee.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(employee[0]);
  } catch (err) {
    console.error("Error fetching Infos:", err);
    res.status(500).json({ error: "Error fetching Infos" });
  } finally {
    conn.release();
  }
});

export default router;
