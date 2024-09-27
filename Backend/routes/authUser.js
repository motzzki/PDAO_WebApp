import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import express from "express";

const router = express.Router();

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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check the employees table for staff and admin groups
    const [employeeRows] = await pool.query(
      `SELECT userId, accountId, password, user_group 
      FROM tblusers join user_groups on userId = group_id 
      WHERE accountId = ?`,
      [username]
    );

    // Check the tblusers table if no employee was found
    const [userRows] = await pool.query(
      `select employeeId, username, password, user_group from employees 
      left join user_groups on group_id = employeeId 
      where username = ?`,
      [username]
    );

    // Combine the results
    const user =
      employeeRows.length > 0
        ? employeeRows[0]
        : userRows.length > 0
        ? userRows[0]
        : null;

    // If user is not found
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Check password
    let passwordMatch = false;

    // If the user password is hashed, compare it
    if (user.password) {
      // Assuming if password starts with $2y$ (bcrypt hash)
      if (user.password.startsWith("$2b$")) {
        passwordMatch = await bcrypt.compare(password, user.password);
      } else {
        // For plain-text password
        passwordMatch = password === user.password;
      }
    }

    // If password does not match
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Generate access token
    const accessToken = jwt.sign(
      {
        id: user.employeeId || user.userId,
        username: user.username || user.accountId,
        user_groups: user.user_group,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      {
        id: user.employeeId || user.userId,
        username: user.username || user.accountId,
        user_groups: user.user_group,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "3d" }
    );

    console.log("User Logged In:", {
      id: user.id,
      username: user.username,
      user_group: user.user_group,
    });

    res.status(200).json({ accessToken, refreshToken });
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
        id: user.id,
        first_name: user.first_name,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ accessToken });
  });
});

export default router;
