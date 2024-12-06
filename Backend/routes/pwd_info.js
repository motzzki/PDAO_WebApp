import { log } from "console";
import pool from "../db.js";
import express from "express";
import formidable from "formidable";
import fs from "fs/promises";
import bcrypt from "bcrypt";

const router = express.Router();
let conn;

router.get("/pwd_info", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const barangay = req.query.barangay || null;
    const disabilityStatus = req.query.disability_status || null;
    const order = req.query.order === "desc" ? "DESC" : "ASC";

    let whereClause = [];
    let queryParams = [];

    if (barangay) {
      whereClause.push("tbladdress.barangay = ?");
      queryParams.push(barangay);
    }

    if (disabilityStatus) {
      whereClause.push("disabilities.disability_status = ?");
      queryParams.push(disabilityStatus);
    }

    const whereQuery =
      whereClause.length > 0 ? "WHERE " + whereClause.join(" AND ") : "";

    const [infos] = await conn.query(
      `SELECT tblusers.*, tbladdress.barangay, disabilities.disability_status
       FROM tblusers
       LEFT JOIN tbladdress ON tblusers.userId = tbladdress.user_id
       LEFT JOIN disabilities ON tblusers.userId = disabilities.user_id
       ${whereQuery}
       ORDER BY tblusers.userId ${order}
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    const [[{ total }]] = await conn.query(
      `SELECT COUNT(*) as total
       FROM tblusers
       LEFT JOIN tbladdress ON tblusers.userId = tbladdress.user_id
       LEFT JOIN disabilities ON tblusers.userId = disabilities.user_id
       ${whereQuery}`,
      queryParams // Ensure same queryParams are used for count query
    );

    const totalPages = Math.ceil(total / limit);

    // Send the response with the data and pagination info
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

router.post("/post-sched", async (req, res) => {
  try {
    const { files } = await upload(req, res);

    if (!files || !files.file || !files.file[0].filepath) {
      return res.status(400).json({ error: "Picture is required" });
    }

    const uploadedFile = files.file[0]; // Access the first file in the array
    console.log("Uploaded file:", uploadedFile);

    // Generate a new unique file name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const newFileName = `image-${uniqueSuffix}-${uploadedFile.originalFilename}`;
    const newPath = `assets/uploads/${newFileName}`;
    console.log("New file path:", newPath);

    const currentDateTime = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    await fs.rename(uploadedFile.filepath, newPath);

    const conn = await pool.getConnection();
    const sql = `INSERT INTO schedtbl (path, sched_created) VALUES (?, ?)`;
    const [result] = await conn.query(sql, [newPath, currentDateTime]);

    res.status(201).json({
      message: "Schedule image uploaded successfully",
      id: result.insertId,
      path: newPath,
      sched_created: currentDateTime,
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).json({ error: "Failed to upload image" });
  } finally {
    if (conn) conn.release();
  }
});

router.get("/get-images", async (req, res) => {
  const useProduction = false; // Change to `true` for production

  const host = useProduction
    ? "https://api.pdao-web.online"
    : "http://localhost:8018"; // Adjust for local or production environments

  try {
    // Connect to the database
    const conn = await pool.getConnection();
    const sql = `SELECT path FROM schedtbl ORDER BY sched_created DESC LIMIT 1`;
    const [rows] = await conn.query(sql);

    // If no records are found, return 404
    if (rows.length === 0) {
      return res.status(404).json({ message: "No images found." });
    }

    // Map over each row to create a list of full image URLs
    const imagesWithFullPath = rows.map((row) => {
      const imagePath = row.path;
      return {
        imageUrl: `${host}/uploads/${imagePath.split("/").pop()}`, // Construct full image URL
      };
    });

    // Respond with all image URLs
    res.status(200).json(imagesWithFullPath);
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).json({ error: "Error fetching images" });
  } finally {
    if (conn) conn.release(); // Release the database connection
  }
});

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

    conn = await pool.getConnection();

    // Fetch the current facility data
    const [currentFacility] = await conn.query(
      "SELECT picture FROM facilities WHERE facility_id = ?",
      [facilityId]
    );

    // Check if the facility exists
    if (currentFacility.length === 0) {
      return res.status(404).json({ error: "Facility not found" });
    }

    let newPath = currentFacility[0].picture; // Default to current picture path
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

      // Optionally delete the old image file
      if (currentFacility[0].picture) {
        await fs.unlink(currentFacility[0].picture); // Delete old image file
      }
    }

    // Update the SQL query
    const sql = `
      UPDATE facilities
      SET facility_name = ?, location = ?, flag = ?, accessibility_features = ?, picture = ?
      WHERE facility_id = ?
    `;

    const params = [
      facility_name,
      location,
      flag,
      accessibility_features,
      newPath, // Use the updated path (new or existing)
      facilityId,
    ];

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
  const useProduction = false; // Change to `true` for production
  const host = useProduction
    ? "https://api.pdao-web.online"
    : "http://localhost:8018";

  try {
    const { search } = req.query; // Get the search query parameter
    conn = await pool.getConnection();

    // Base SQL query
    let sql = `SELECT facility_id, facility_name, location, flag, accessibility_features, picture FROM facilities`;

    // Append WHERE clause if search parameter exists
    if (search) {
      sql += ` WHERE facility_name LIKE ?`;
    }

    const [facilities] = search
      ? await conn.query(sql, [`%${search}%`]) // Add search query
      : await conn.query(sql);

    // Check if facilities were found
    if (facilities.length === 0) {
      return res.status(404).json({ message: "No facilities found." });
    }

    const facilitiesWithFullPath = facilities.map((facility) => {
      return {
        ...facility,
        picture: `${host}/uploads/${facility.picture.split("/").pop()}`, // Assuming picture is stored as a relative path
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

router.post("/submit-feedback", async (req, res) => {
  try {
    const { userId, ratings, openFeedback } = req.body;
    conn = await pool.getConnection();

    const sql = `
      INSERT INTO user_feedbacks (userId, question1, question2, question3, question4, question5, suggestion)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await conn.query(sql, [
      userId,
      ratings.question1,
      ratings.question2,
      ratings.question3,
      ratings.question4,
      ratings.question5,
      openFeedback,
    ]);

    res.status(201).json({
      message: "Feedback submitted successfully",
      id: result.insertId,
    });
  } catch (err) {
    console.error("Error submitting feedback:", err);
    res.status(500).json({ error: "Error submitting feedback." });
  } finally {
    if (conn) conn.release();
  }
});

router.post("/change_password", async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;

  // Validate input
  if (!userId || !oldPassword || !newPassword) {
    return res.status(400).json({
      error: "Acount Id, old password, and new password are required",
    });
  }

  try {
    // Check if the user exists
    const [user] = await pool.query("SELECT * FROM tblusers WHERE userId = ?", [
      userId,
    ]);

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user);
    console.log(userId);

    // Compare old password with stored hash
    const passwordMatch = await bcrypt.compare(oldPassword, user[0].password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect old password" });
    }

    const hashedNewPassword = await bcrypt.hash(
      newPassword,
      parseInt(process.env.SALT_ROUNDS)
    );

    // Update password in the database
    await pool.query("UPDATE tblusers SET password = ? WHERE userId = ?", [
      hashedNewPassword,
      userId,
    ]);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint to get previous notifications
// router.get("/api/notifications", (req, res) => {
//   const query = "SELECT * FROM notifications ORDER BY timestamp DESC";
//   db.query(query, (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: "Error fetching notifications" });
//     }
//     res.json(results);
//   });
// });

export default router;
