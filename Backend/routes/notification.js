import pool from "../db.js";
import express from "express";
import { config } from "dotenv";

config();

const router = express.Router();
let conn;

router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  const query = `
      SELECT * FROM notifications_users 
      WHERE userId = ? 
      ORDER BY timestamp DESC
    `;

  try {
    const [results] = await pool.query(query, [userId]);

    const notifications = {
      birthday: [],
      expired_id: [],
    };

    results.forEach((notification) => {
      if (notification.type === "birthday") {
        notifications.birthday.push(notification);
      } else if (notification.type === "expired_id") {
        notifications.expired_id.push(notification);
      }
    });

    res.json(notifications);
  } catch (err) {
    console.error("Error fetching user notifications:", err);
    res.status(500).json({ error: "Error fetching user notifications" });
  }
});

router.get("/employeenotif", async (req, res) => {
  const type = req.query.type || "birthday";

  const query = `
        SELECT * FROM notifications_employees 
        WHERE type = ? 
        ORDER BY timestamp DESC
      `;

  try {
    const [notifications] = await pool.query(query, [type]);

    if (notifications.length === 0) {
      return res.status(404).json({ message: "No notifications found." });
    }

    res.json(notifications);
  } catch (err) {
    console.error("Error fetching employee notifications:", err);
    res.status(500).json({ error: "Error fetching employee notifications" });
  }
});

export default router;
