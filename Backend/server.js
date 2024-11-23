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
import nodemailer from "nodemailer";

config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT;

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

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendBirthdayEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Happy Birthday, ${name}!`,
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              color: #fff;
              padding: 20px;
            }
            .birthday-message {
              background-color: #ff3333; /* Red background */
              color: white;
              padding: 20px;
              border-radius: 10px;
              text-align: center;
              font-size: 24px;
              font-weight: bold;
            }
            .info-message {
              background-color: #FFFFFF; /* Yellow background */
              color: #333;
              padding: 15px;
              border-radius: 10px;
              text-align: center;
              font-size: 18px;
              margin-top: 20px;
            }
            .footer {
              font-size: 14px;
              text-align: center;
              margin-top: 20px;
              color: #666;
            }
            .link {
              color: #007bff;
              text-decoration: none;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="birthday-message">
            Today is your birthday, <strong>${name}</strong>!<br>
            Wishing you a wonderful day filled with joy and happiness!
          </div>
          <div class="info-message">
            You may check your schedule for claiming the birthday cash gift!<br>
            <a href="https://pdao-web.online" class="link">Click here to see your schedule</a>
          </div>
          <div class="footer">
            Sent with love from our team!<br>
            Don't forget to enjoy your special day!
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Birthday email sent to ${name} at ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendIDExpirationEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `ID Expiration Reminder for ${name}`,
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              color: #333;
              padding: 20px;
            }
            .expiration-message {
              background-color: #ffcc00; /* Yellow background */
              color: #333;
              padding: 20px;
              border-radius: 10px;
              text-align: center;
              font-size: 24px;
              font-weight: bold;
            }
            .info-message {
              background-color: #fff; /* White background */
              color: #333;
              padding: 15px;
              border-radius: 10px;
              text-align: center;
              font-size: 18px;
              margin-top: 20px;
            }
            .footer {
              font-size: 14px;
              text-align: center;
              margin-top: 20px;
              color: #666;
            }
            .link {
              color: #007bff;
              text-decoration: none;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="expiration-message">
            Hello <strong>${name}</strong>,<br>
            Your ID is about to expire soon!
          </div>
          <div class="info-message">
            Please renew your ID before the expiration date to continue enjoying your benefits.<br>
            <a href="https://pdao-web.online/renew" class="link">Click here to renew your ID</a>
          </div>
          <div class="footer">
            This is a friendly reminder from our team.<br>
            Thank you for your prompt attention!
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`ID expiration email sent to ${name} at ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Notification cron job
// "*/1 * * * *",
// 0 6 * * *
cron.schedule(
  "0 6 * * *",
  async () => {
    const today = moment().tz("Asia/Manila").format("MM-DD");

    const todayBirthdayQuery = `
      SELECT userId, first_name, last_name, email, DATE_FORMAT(date_of_birth, '%m-%d') AS dob
      FROM tblusers
      WHERE DATE_FORMAT(date_of_birth, '%m-%d') = ?
    `;

    // New expired ID query incorporating the requirement to notify 30 days prior and on the expiration date
    const expiredIdQuery = `
        SELECT 
    userId,
    first_name,
    last_name,
    expired_id,
    email,
    CASE 
        WHEN expired_id = CURDATE() THEN 'notify_on_expiration'
        WHEN expired_id BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY) THEN 'notify_before'
    END AS notification_type
      FROM 
          tblusers
      WHERE 
          expired_id BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY);
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
            await sendBirthdayEmail(
              user.email,
              `${user.first_name} ${user.last_name}`
            );

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

      const [expiredResults] = await pool.query(expiredIdQuery);
      if (expiredResults.length > 0) {
        expiredResults.forEach(async (user) => {
          let messageToUser;
          let messageToEmployee;

          if (user.notification_type === "notify_before") {
            messageToUser = `Your ID will expire in 30 days, ${user.first_name} ${user.last_name}. Please renew it!`;
            messageToEmployee = `The ID of ${user.first_name} ${user.last_name} will expire soon.`;
          } else if (user.notification_type === "notify_on_expiration") {
            messageToUser = `Your ID has expired today, ${user.first_name} ${user.last_name}. Please renew it immediately!`;
            messageToEmployee = `The ID of ${user.first_name} ${user.last_name} has expired today.`;
          }

          // User notification
          const notifUserQuery = `
            INSERT INTO notifications_users (message, userId, type)
            VALUES (?, ?, ?)
          `;

          try {
            const [resultUser] = await pool.query(notifUserQuery, [
              messageToUser,
              user.userId,
              user.notification_type,
            ]);
            const newNotificationUser = {
              notifId: resultUser.insertId,
              message: messageToUser,
              userId: user.userId,
              type: user.notification_type,
              timestamp: new Date(),
            };

            // Emit notification for the user
            getIO().emit("expiredIdNotification", newNotificationUser);
            await sendIDExpirationEmail(
              user.email,
              `${user.first_name} ${user.last_name}`
            );
            console.log(
              `Expired ID notification created for ${user.first_name} ${user.last_name} (User)`
            );
            console.log(newNotificationUser);
          } catch (err) {
            console.error("Error creating user expired ID notification:", err);
          }

          // Employee notification
          const notifEmployeeQuery = `
            INSERT INTO notifications_employees (message, userId, type)
            VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE message = VALUES(message)
          `;

          try {
            const [resultEmployee] = await pool.query(notifEmployeeQuery, [
              messageToEmployee,
              user.userId, // Ensure this references the correct employeeId if necessary
              user.notification_type,
            ]);
            const newNotificationEmployee = {
              notifId: resultEmployee.insertId,
              message: messageToEmployee,
              userId: user.userId,
              type: user.notification_type,
              timestamp: new Date(),
            };

            // Emit notification for the employee
            getIO().emit(
              "employeeExpiredIdNotification",
              newNotificationEmployee
            );
            // console.log(
            //   `Expired ID notification created for employee regarding ${user.first_name} ${user.last_name}`
            // );
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
