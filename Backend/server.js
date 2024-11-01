import express, { json } from "express";
import http from "http";
import cors from "cors";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createRequire } from "module";
import { Server } from "socket.io";
import moment from "moment-timezone";
import cron from "node-cron";
config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});
const port = process.env.PORT || 8000;
const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(json());
app.use(cors());

import pool from "./db.js";

(async () => {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("MySQL Connected");
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
  }
})();

//ROUTES
import authUser from "./routes/authUser.js";
import registerPwd from "./routes/register_pwd.js";
import pwdInfo from "./routes/pwd_info.js";
import barangay from "./routes/barangay.js";
import user_management from "./routes/user_management.js";
//
app.use("/api/authUser", authUser);
app.use("/api/registerPwd", registerPwd);
app.use("/api/pwdInfo", pwdInfo);
app.use("/api/barangay", barangay);
app.use("/api/user_management", user_management);
app.use("/uploads", express.static(join(__dirname, "./assets/uploads")));

// API endpoints to get notifications for users and employees
app.get("/api/notifications/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const query =
    "SELECT * FROM notifications_users WHERE userId = ? ORDER BY timestamp DESC";
  try {
    const [results] = await pool.query(query, [userId]);
    res.json(results);
  } catch (err) {
    console.error("Error fetching user notifications:", err);
    res.status(500).json({ error: "Error fetching user notifications" });
  }
});

// Get employee notifications
app.get("/api/notifications/employee/:employeeId", async (req, res) => {
  const employeeId = req.params.employeeId;
  const query =
    "SELECT * FROM notifications_employees WHERE employeeId = ? ORDER BY timestamp DESC";
  try {
    const [results] = await pool.query(query, [employeeId]);
    res.json(results);
  } catch (err) {
    console.error("Error fetching employee notifications:", err);
    res.status(500).json({ error: "Error fetching employee notifications" });
  }
});

// WebSocket connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle new user notifications
  socket.on("newUserNotification", async (data) => {
    const insertQuery =
      "INSERT INTO notifications_users (message, userId) VALUES (?, ?)";
    try {
      const [result] = await pool.query(insertQuery, [
        data.message,
        data.userId,
      ]);
      const [rows] = await pool.query(
        "SELECT * FROM notifications_users WHERE notifId = ?",
        [result.insertId]
      );
      io.emit("receiveUserNotification", rows[0]);
    } catch (err) {
      console.error("Error handling new user notification:", err);
    }
  });

  // Handle new employee notifications
  socket.on("newEmployeeNotification", async (data) => {
    const insertQuery =
      "INSERT INTO notifications_employees (message, employeeId) VALUES (?, ?)";
    try {
      const [result] = await pool.query(insertQuery, [
        data.message,
        data.employeeId,
      ]);
      const [rows] = await pool.query(
        "SELECT * FROM notifications_employees WHERE notifId = ?",
        [result.insertId]
      );
      io.emit("receiveEmployeeNotification", rows[0]);
    } catch (err) {
      console.error("Error handling new employee notification:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

export const newNotification = (userId, userType, message) => {
  if (userType === "user") {
    const query =
      "INSERT INTO notifications_users (message, userId) VALUES (?, ?)";
    pool.query(query, [message, userId], (err, result) => {
      if (err) {
        console.error("Error saving user notification:", err);
        return res.status(500).json({ error: "Failed to create notification" });
      }

      pool.query(
        "SELECT * FROM notifications_users WHERE notifId = ?",
        [result.insertId],
        (err, rows) => {
          if (err) {
            console.error("Error retrieving saved user notification:", err);
            return res
              .status(500)
              .json({ error: "Failed to retrieve notification" });
          }

          const newNotification = rows[0];
          io.emit("receiveUserNotification", newNotification); // Emit to all connected clients
          res.json({ success: true, notification: newNotification });
        }
      );
    });
  } else if (userType === "employee") {
    const query =
      "INSERT INTO notifications_employees (message, employeeId) VALUES (?, ?)";
    pool.query(query, [message, userId], (err, result) => {
      if (err) {
        console.error("Error saving employee notification:", err);
        return res.status(500).json({ error: "Failed to create notification" });
      }

      pool.query(
        "SELECT * FROM notifications_employees WHERE notifId = ?",
        [result.insertId],
        (err, rows) => {
          if (err) {
            console.error("Error retrieving saved employee notification:", err);
            return res
              .status(500)
              .json({ error: "Failed to retrieve notification" });
          }

          const newNotification = rows[0];
          io.emit("receiveEmployeeNotification", newNotification); // Emit to all connected clients
          res.json({ success: true, notification: newNotification });
        }
      );
    });
  }
};

cron.schedule(
  "0 6 * * *",
  () => {
    // Get the current date in Manila time
    const today = moment().tz("Asia/Manila").format("YYYY-MM-DD");

    const query = "SELECT * FROM tblusers WHERE DATE(date_of_birth) = ?";

    pool.query(query, [today], (err, results) => {
      if (err) {
        console.error("Error fetching users with birthdays:", err);
        return;
      }

      // Handle the results
      if (results.length > 0) {
        results.forEach((user) => {
          console.log(`Happy Birthday to ${user.name}!`);
        });
      } else {
        console.log("No users have birthdays today.");
      }
    });
  },
  {
    scheduled: true,
    timezone: "Asia/Manila",
  }
);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
