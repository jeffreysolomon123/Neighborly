// backend/src/routes/protected.ts

import express from "express";
import { authenticateToken, AuthRequest } from "../middleware/authMiddleware"; // ✅ clean import

const router = express.Router();

router.get("/posts", authenticateToken, (req: AuthRequest, res) => {
  res.json({
    message: "you accessed a protected route!",
    user: req.user,
  });
});

router.post("/prot", authenticateToken, (req:AuthRequest,res)=> {
    const values = req.body;
    res.json({
        message: "you posted",
        values : values,
    })
});

export default router;
