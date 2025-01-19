import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connection } from './db.js';
import { userRouter } from './routes/users.js';
import { authRouter } from './routes/auth.js';

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//db
connection();

//routes
app.use("/api/users",userRouter);
app.use("/api/auth",authRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});

