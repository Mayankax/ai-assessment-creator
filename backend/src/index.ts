import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import "./workers/assignment.worker.js";
import assignmentRoutes from "./routes/assignment.routes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/assignment", assignmentRoutes);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});