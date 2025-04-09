import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();




// Create a custom interface extending Express's Request
export interface AuthRequest extends Request {
  user?: any;
}

  
  export const authenticateToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1]; // Bearer <token>
  
    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }
  
    try {
      const secret = process.env.JWT_SECRET!;
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ message: "Invalid token" });
    }
  };
  