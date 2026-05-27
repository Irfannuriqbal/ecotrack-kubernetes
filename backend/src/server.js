import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reportsRouter from "./routes/reports.js";
import pool, { initializeDatabase } from "./db.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);
const corsOrigin = process.env.CORS_ORIGIN || "*";

app.use(
  cors({
    origin:
      corsOrigin === "*"
        ? true
        : corsOrigin.split(",").map((origin) => origin.trim()),
  }),
);
app.use(express.json());

app.get("/health", async (_request, response) => {
  try {
    await pool.query("SELECT 1");
    response.json({
      success: true,
      message: "EcoTrack backend is healthy",
      database: "connected",
    });
  } catch (error) {
    response.status(503).json({
      success: false,
      message: "EcoTrack backend is unhealthy",
      database: "disconnected",
    });
  }
});

app.use("/api/reports", reportsRouter);

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

async function startServer() {
  try {
    await initializeDatabase();
    app.listen(port, () => {
      console.log(`EcoTrack backend running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start backend:", error);
    process.exit(1);
  }
}

startServer();
