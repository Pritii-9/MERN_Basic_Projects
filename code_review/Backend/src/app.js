import express from "express";
import aiRoutes from "./routes/ai.routes.js";
import { config } from "dotenv";

// Load environment variables
config();

const app = express();

app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
    res.send("Hello World");
});

// AI routes
app.use("/ai", aiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
