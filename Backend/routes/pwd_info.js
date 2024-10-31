import pool from "../db.js";
import express from "express";
import formidable from "formidable";
import fs from "fs/promises";

const router = express.Router();
let conn;

router.get("/pwd_info", async (req, res) => {
  try {
    conn = await pool.getConnection();

    const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit, 10) || 15; // Default to 15 records per page
    const offset = (page - 1) * limit;

    // Get the barangay filtering parameter from the request
    const barangay = req.query.barangay || null; // Accept barangay as query param

    // Get the sorting parameter from the request; default is to sort by barangay
    const order = req.query.order === "desc" ? "DESC" : "ASC"; // Ascending or descending

    // Query with limit and offset for pagination, and filtering by barangay
    const [infos] = await conn.query(
      `SELECT *, barangay FROM tblusers 
       LEFT JOIN tbladdress  ON user_id = userId
       ${barangay ? "WHERE barangay = ?" : ""}
       ORDER BY userId DESC 
       LIMIT ? OFFSET ?`,
      barangay ? [barangay, limit, offset] : [limit, offset]
    );

    // Get the total count for pagination
    const [[{ total }]] = await conn.query(
      `SELECT COUNT(*) as total FROM tblusers  
       LEFT JOIN tbladdress  ON user_id = userId
       ${barangay ? "WHERE barangay = ?" : ""}`,
      barangay ? [barangay] : []
    );

    const totalPages = Math.ceil(total / limit);

    res.json({
      data: infos,
      pagination: {
        total,
        currentPage: page,
        totalPages,
        limit,
      },
    });
  } catch (err) {
    console.error("Error fetching Infos:", err);
    res.status(500).json({ error: "Error fetching Infos" });
  } finally {
    if (conn) conn.release();
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

const upload = (req, res) => {
  return new Promise((resolve, reject) => {
    const form = formidable({
      multiples: false,
      keepExtensions: true, // Keep file extension
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

router.post("/facilities", async (req, res) => {
  try {
    const { fields, files } = await upload(req, res);

    console.log("Parsed Fields:", fields); // Log fields
    console.log("Parsed Files:", files);

    const facility_name = fields.facility_name[0];
    const location = fields.location[0];
    const flag = fields.flag[0];
    const accessibility_features = fields.accessibility_features[0];

    // Validate required fields
    if (!facility_name || !location || !flag || !accessibility_features) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const picture = files.picture[0]; // Get the uploaded file

    // Ensure the uploaded file was saved correctly
    if (!picture || !picture.filepath) {
      return res.status(400).json({ error: "Picture is required" });
    }

    // Read the old path and prepare new file name and path
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const newFileName = `image-${uniqueSuffix}-${picture.newFilename}`;
    const newPath = `assets/uploads/${newFileName}`;

    // Move the file to the new path
    await fs.rename(picture.filepath, newPath);

    conn = await pool.getConnection();

    const sql = `
      INSERT INTO facilities (facility_name, location, flag, accessibility_features, picture)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await conn.query(sql, [
      facility_name,
      location,
      flag, // Store the flag value
      accessibility_features,
      newPath, // Store the new path in the database
    ]);

    res
      .status(201)
      .json({ message: "Facility added successfully", id: result.insertId });
  } catch (err) {
    console.error("Error adding facility:", err);
    res.status(500).json({ error: "Error adding facility" });
  } finally {
    if (conn) conn.release();
  }
});

// Update a facility
router.put("/facilities/:id", async (req, res) => {
  const facilityId = req.params.id; // Get the facility ID from the URL
  let conn;

  try {
    const { fields, files } = await upload(req, res);

    console.log("Parsed Fields for Update:", fields); // Log fields
    console.log("Parsed Files for Update:", files);

    const facility_name = fields.facility_name[0];
    const location = fields.location[0];
    const flag = fields.flag[0];
    const accessibility_features = fields.accessibility_features[0];

    // Validate required fields
    if (
      !facilityId ||
      !facility_name ||
      !location ||
      !flag ||
      !accessibility_features
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let newPath = null;
    if (files.picture) {
      // Check if a new file was uploaded
      const picture = files.picture[0];

      // Ensure the uploaded file was saved correctly
      if (!picture || !picture.filepath) {
        return res.status(400).json({ error: "Picture is required" });
      }

      // Read the old path and prepare new file name and path
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const newFileName = `image-${uniqueSuffix}-${picture.newFilename}`;
      newPath = `assets/uploads/${newFileName}`;

      // Move the file to the new path
      await fs.rename(picture.filepath, newPath);
    }

    conn = await pool.getConnection();

    // Update the SQL query
    const sql = `
      UPDATE facilities
      SET facility_name = ?, location = ?, flag = ?, accessibility_features = ?${
        newPath ? ", picture = ?" : ""
      }
      WHERE facility_id = ?
    `;

    const params = [
      facility_name,
      location,
      flag,
      accessibility_features,
      facilityId,
    ];

    if (newPath) {
      params.splice(4, 0, newPath); // Insert the new picture path if it exists
    }

    const [result] = await conn.query(sql, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Facility not found" });
    }

    res.status(200).json({ message: "Facility updated successfully" });
  } catch (err) {
    console.error("Error updating facility:", err);
    res.status(500).json({ error: "Error updating facility" });
  } finally {
    if (conn) conn.release();
  }
});

router.get("/get-facilities", async (req, res) => {
  try {
    conn = await pool.getConnection();
    const sql = `SELECT facility_id, facility_name, location, flag, accessibility_features, picture FROM facilities`;

    const [facilities] = await conn.query(sql);

    // Check if facilities were found
    if (facilities.length === 0) {
      return res.status(404).json({ message: "No facilities found." });
    }

    // Prefix the relative path with the base URL
    const facilitiesWithFullPath = facilities.map((facility) => {
      return {
        ...facility,
        picture: `http://localhost:8000/uploads/${facility.picture
          .split("/")
          .pop()}`, // Assuming picture is stored as a relative path
      };
    });

    // Respond with the facilities data
    res.status(200).json(facilitiesWithFullPath);
  } catch (err) {
    console.error("Error fetching facilities:", err);
    res.status(500).json({ error: "Error fetching facilities" });
  } finally {
    if (conn) conn.release(); // Release the database connection
  }
});

export default router;
