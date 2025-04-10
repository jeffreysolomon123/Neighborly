// backend/src/server.ts

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import protectedRoutes from "./routes/protected";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: "*", credentials: true }));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes); // 👈 now /api/posts is protected

app.get("/", (_req, res) => {
  res.send("Neighbourhood API is running 🌐");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
