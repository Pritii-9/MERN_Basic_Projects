import express from 'express'
import cors from 'cors'
import connectToMongoDB from './db/db.js'
import authRouter from './routes/auth.js'

const app = express()
app.use(cors());
app.use(express.json())
app.use('api/auth',authRouter);

const port = 3000;
app.listen(port, () => {
    connectToMongoDB();
    console.log(`Server running on port ${port}`);
});