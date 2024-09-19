import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";

config();

const app = express();
const port = process.env.PORT || 8000;

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
//
app.use("/api/authUser", authUser);
app.use("/api/registerPwd", registerPwd);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
