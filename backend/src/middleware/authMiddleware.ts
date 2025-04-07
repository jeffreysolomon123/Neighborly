import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();



interface AuthRequest extends Request {
    user? : any;
}

export const authenticateToken = (
    req : AuthRequest,
    res : Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; // "Bearer <token>"
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

    try {
        const secret = process.env.JWT_SECRET!;
        const decoded = jwt.verify(token, secret);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({message: "Invalid token"});
    }

}