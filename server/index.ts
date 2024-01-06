import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import config from "config";
import authRouter from "./routes/auth.routes";
import corsMiddleware from "./middleware/cors.middleware";

const app = express();
const PORT: number = config.get("serverPort");

app.use(corsMiddleware);
app.use(express.json());
app.use("/api/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(config.get("dbUrl"));

    app.listen(PORT, () => {
      console.log("Server started on port", PORT);
    });
  } catch (e) {
    console.error("Error starting the server:", e);
  }
};

start();
