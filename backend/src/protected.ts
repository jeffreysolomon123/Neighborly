import express from "express";
import { authenticateToken } from "./middleware/authMiddleware";

const router = express.Router();

router.get("/posts", authenticateToken, (req, res) => {
  res.json({
    message: "You accessed a protected route!",
    user: req.user,
  });
});

export default router;
