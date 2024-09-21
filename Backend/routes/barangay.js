import pool from "../db.js";
import express from "express";
import { config } from "dotenv";

config();

const router = express.Router();
let conn;

router.get("/get_barangay", async (req, res) => {
  try {
    conn = await pool.getConnection();
    const [barangay_info] =
      await conn.query(`SELECT barangay, COUNT(user_id) as Registered
                        FROM tblusers
                        JOIN tbladdress on tbladdress.user_id = userId
                        GROUP BY barangay`);
    res.json(barangay_info);
  } catch (err) {
    console.error("Error fetching Barangay:", err);
    res.status(500).json({ error: "Error fetching Barangay" });
  } finally {
    conn.release();
  }
});

router.get("/get_disability", async (req, res) => {
  try {
    conn = await pool.getConnection();
    const [disabilities] =
      await conn.query(`select disability_status, count(user_id) as Num
                            from tblusers
                            join disabilities on disabilities.user_id = userId
                            group by disability_status`);
    res.json(disabilities);
  } catch (err) {
    console.error("Error fetching Disabilities:", err);
    res.status(500).json({ error: "Error fetching Disabilities" });
  } finally {
    conn.release();
  }
});

router.get("/get_total_registered", async (req, res) => {
  try {
    conn = await pool.getConnection();
    const [results] = await conn.query(`
        SELECT COUNT(user_id) AS total_registered
        FROM tblusers
        JOIN tbladdress ON tbladdress.user_id = userId
      `);
    res.json({ total_registered: results[0]?.total_registered || 0 });
  } catch (err) {
    console.error("Error fetching total registered users:", err);
    res.status(500).json({ error: "Error fetching total registered users" });
  } finally {
    conn.release();
  }
});

export default router;
