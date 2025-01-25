import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from 'path';
import dotenv from 'dotenv'
import { connectDB } from "./lib/db.js"
import CookieParser from "cookie-parser"
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json()); // body parsing middleware
app.use("/api/auth", authRoutes);
app.use("/api/message",messageRoutes);
dotenv.config()

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

const PORT = process.env.PORT;
app.listen(5001, () => {
  console.log("Server is running on PORT: " + PORT);
  connectDB()
});
