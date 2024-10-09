import pool from "../db.js";
import express from "express";

const router = express.Router();
let conn;

router.get("/pwd_info", async (req, res) => {
  try {
    conn = await pool.getConnection();

    const [infos] = await conn.query(`SELECT * FROM tblusers`);

    res.json(infos);
  } catch (err) {
    console.error("Error fetching Infos:", err);
    res.status(500).json({ error: "Error fetching Infos" });
  } finally {
    conn.release();
  }
});

router.get("/logged_user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    conn = await pool.getConnection();

    const [infos] = await conn.query(
      `SELECT u.userId, u.first_name, u.middle_name, u.last_name, u.email, u.age, u.gender, 
       u.date_of_birth, u.blood_type, u.contact_num,
       d.disability_status, c.cause_status, cs.civilStatus, 
       eb.educational_status, es.employment_status, o.occupation_name, 
       a.house_address, a.barangay 
            FROM tblusers u
            LEFT JOIN disabilities d ON d.user_id = u.userId
            LEFT JOIN tbl_civilstatus cs ON cs.user_id = u.userId
            LEFT JOIN tbl_cause_of_disability c ON c.user_id = u.userId
            LEFT JOIN tbl_educational_background eb ON eb.user_id = u.userId
            LEFT JOIN tbl_employment_status es ON es.user_id = u.userId
            LEFT JOIN tbl_occupations o ON o.user_id = u.userId
            LEFT JOIN tbladdress a ON a.user_id = u.userId
            WHERE u.userId = ?`,
      [userId]
    );

    if (infos.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(infos[0]);
  } catch (err) {
    console.error("Error fetching Infos:", err);
    res.status(500).json({ error: "Error fetching Infos" });
  } finally {
    conn.release();
  }
});

router.get("/pwd_details/:userId", async (req, res) => {
  const { userId } = req.params;

  const details = `SELECT DISTINCT userId, disability_status, cause_status, civilStatus, educational_status, employment_status, occupation_name, house_address, barangay
        FROM tblusers
        JOIN 
        disabilities on disabilities.user_id = userId
        JOIN
        tbl_cause_of_disability on tbl_cause_of_disability.user_id = userId
        JOIN
        tbl_civilstatus on tbl_civilstatus.user_id = userId
        JOIN
        tbl_educational_background on tbl_educational_background.user_id = userId
        JOIN
        tbl_employment_status on tbl_employment_status.user_id = userId
        JOIN
        tbl_occupations on tbl_occupations.user_id = userId
        JOIN
        tbladdress on tbladdress.user_id = userId
        WHERE userId = ?;`;

  try {
    conn = await pool.getConnection();
    const [results] = await conn.query(details, [userId]);
    res.json(results);
  } catch (err) {
    console.error("Error fetching Detailed Info:", err);
    res.status(500).json({ message: "Database query failed" });
  } finally {
    conn.release();
  }
});

export default router;
