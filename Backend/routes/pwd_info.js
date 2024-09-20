import pool from "../db.js";
import express from "express";

const router = express.Router();
let conn;

router.get("/pwd_info", async (req, res) =>{
    try{
        conn = await pool.getConnection()

        const [infos] = await conn.query(`SELECT * FROM tblusers`)

        res.json(infos)
    }catch (err){
        console.error("Error fetching Infos:", err);
    res.status(500).json({ error: "Error fetching Infos" });
    }finally{
        conn.release();
    }

})

router.get("/pwd_details/:userId", async (req, res) =>{

    const {userId} = req.params;
    

    const details =
    `SELECT DISTINCT userId, disability_status, cause_status, civilStatus, educational_status, employment_status, occupation_name, house_address, barangay
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
        conn = await pool.getConnection()
        const [results] = await conn.query(details, [userId])
        res.json(results)
    } catch (err) {
        console.error("Error fetching Detailed Info:", err);
    res.status(500).json({ message: "Database query failed" });
        
    } finally {
        conn.release()
    }
})


export default router;