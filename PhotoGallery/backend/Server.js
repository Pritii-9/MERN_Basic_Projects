
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connection } from "./db.js";
import UploadRoutes from "./routes/UploadRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

try {
  connection();
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
  process.exit(1); // Exit the process with a non-zero exit code
}

app.use(UploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
