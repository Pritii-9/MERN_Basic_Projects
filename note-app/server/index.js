import express from 'express';
import cors from 'cors';
import connectToMongoDB from './db/db.js';
import authRouter from './routes/auth.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);

const port = 5000;

app.listen(port, async () => {
  try {
    await connectToMongoDB();
    console.log(`Server running on port ${port}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
});
