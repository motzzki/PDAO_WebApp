// server.js

import express, { json } from "express";
import http from "http";
import cors from "cors";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cron from "node-cron";
import moment from "moment-timezone";
import setupSocket from "./socket.js";
import { getIO } from "./socket.js";
import pool from "./db.js";

config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(json());
app.use(cors());

// Initialize WebSocket connections
const io = setupSocket(server);

(async () => {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("MySQL Connected");
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
  }
})();

// REST API ROUTES
import authUser from "./routes/authUser.js";
import registerPwd from "./routes/register_pwd.js";
import pwdInfo from "./routes/pwd_info.js";
import barangay from "./routes/barangay.js";
import user_management from "./routes/user_management.js";
import notification from "./routes/notification.js";

app.use("/api/authUser", authUser);
app.use("/api/registerPwd", registerPwd);
app.use("/api/pwdInfo", pwdInfo);
app.use("/api/barangay", barangay);
app.use("/api/user_management", user_management);
app.use("/api/notification", notification);
app.use("/uploads", express.static(join(__dirname, "./assets/uploads")));

// API endpoints for notifications

// Notification cron job
// "*/1 * * * *",
// 0 6 * * *
cron.schedule(
  "0 6 * * *",
  async () => {
    const today = moment().tz("Asia/Manila").format("MM-DD");

    // Query to get users whose birthdays are today
    const todayBirthdayQuery = `
      SELECT userId, first_name, last_name, DATE_FORMAT(date_of_birth, '%m-%d') AS dob
      FROM tblusers
      WHERE DATE_FORMAT(date_of_birth, '%m-%d') = ?
    `;

    const expiredIdQuery = `
      SELECT 
        userId,
        first_name,
        last_name,
        NULL AS date_of_birth,
        created_at,
        'expired_id' AS notification_type
      FROM 
        tblusers
      WHERE 
        DATE_ADD(created_at, INTERVAL 5 YEAR) BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW()
    `;

    try {
      // Handle birthday notifications
      const [todayResults] = await pool.query(todayBirthdayQuery, [today]);

      if (todayResults.length > 0) {
        todayResults.forEach(async (user) => {
          const messageToUser = `Today is your birthday, ${user.first_name} ${user.last_name}! Happy Birthday!`;

          const notifUserQuery = `
            INSERT INTO notifications_users (message, userId, type)
            VALUES (?, ?, 'birthday')
          `;

          try {
            const [resultUser] = await pool.query(notifUserQuery, [
              messageToUser,
              user.userId,
            ]);
            const newNotificationUser = {
              notifId: resultUser.insertId,
              message: messageToUser,
              userId: user.userId,
              type: "birthday",
              timestamp: new Date(),
            };

            // Emit notification for the user
            getIO().emit("birthdayNotification", newNotificationUser);
            console.log(
              `Birthday notification created for ${user.first_name} ${user.last_name} (User)`
            );
            console.log(newNotificationUser);
          } catch (err) {
            console.error("Error creating user birthday notification:", err);
          }

          const messageToEmployee = `Today is ${user.first_name} ${user.last_name}'s birthday!`;
          const notifEmployeeQuery = `
            INSERT INTO notifications_employees (message, userId, type)
            VALUES (?, ?, 'birthday') 
            ON DUPLICATE KEY UPDATE message = VALUES(message)
          `;

          try {
            const [resultEmployee] = await pool.query(notifEmployeeQuery, [
              messageToEmployee,
              user.userId,
            ]);
            const newNotificationEmployee = {
              notifId: resultEmployee.insertId,
              message: messageToEmployee,
              userId: user.userId,
              type: "birthday",
              timestamp: new Date(),
            };

            // Emit notification for the employee
            getIO().emit(
              "employeeBirthdayNotification",
              newNotificationEmployee
            );
            console.log(
              `Birthday notification created for ${user.first_name} ${user.last_name} (Employee)`
            );
            console.log(newNotificationEmployee);
          } catch (err) {
            console.error(
              "Error creating employee birthday notification:",
              err
            );
          }
        });
      } else {
        console.log("No birthdays today.");
      }

      // Handle expired ID notifications
      const [expiredResults] = await pool.query(expiredIdQuery);
      if (expiredResults.length > 0) {
        expiredResults.forEach(async (user) => {
          const messageToUser = `Your ID will expire soon, ${user.first_name} ${user.last_name}. Please renew it!`;

          const notifUserQuery = `
            INSERT INTO notifications_users (message, userId, type)
            VALUES (?, ?, 'expired_id')
          `;

          try {
            const [resultUser] = await pool.query(notifUserQuery, [
              messageToUser,
              user.userId,
            ]);
            const newNotificationUser = {
              notifId: resultUser.insertId,
              message: messageToUser,
              userId: user.userId,
              type: "expired_id",
              timestamp: new Date(),
            };

            // Emit notification for the user
            getIO().emit("expiredIdNotification", newNotificationUser);
            console.log(
              `Expired ID notification created for ${user.first_name} ${user.last_name} (User)`
            );
            console.log(newNotificationUser);
          } catch (err) {
            console.error("Error creating user expired ID notification:", err);
          }

          // Create notification for employees regarding the user's expiring ID
          const messageToEmployee = `The ID of ${user.first_name} ${user.last_name} will expire soon.`;
          const notifEmployeeQuery = `
            INSERT INTO notifications_employees (message, userId, type)
            VALUES (?, ?, 'expired_id') 
            ON DUPLICATE KEY UPDATE message = VALUES(message)
          `;

          try {
            const [resultEmployee] = await pool.query(notifEmployeeQuery, [
              messageToEmployee,
              user.userId, // Ensure this references the correct employeeId if necessary
            ]);
            const newNotificationEmployee = {
              notifId: resultEmployee.insertId,
              message: messageToEmployee,
              userId: user.userId,
              type: "expired_id",
              timestamp: new Date(),
            };

            // Emit notification for the employee
            getIO().emit(
              "employeeExpiredIdNotification",
              newNotificationEmployee
            );
            console.log(
              `Expired ID notification created for employee regarding ${user.first_name} ${user.last_name}`
            );
            console.log(newNotificationEmployee);
          } catch (err) {
            console.error(
              "Error creating employee expired ID notification:",
              err
            );
          }
        });
      } else {
        console.log("No expiring IDs today.");
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
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
