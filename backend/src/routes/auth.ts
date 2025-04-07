// src/routes/auth.ts
import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authenticateToken } from '../middleware/authMiddleware';

dotenv.config();

const router = express.Router();
const prisma = new PrismaClient();

// POST /register
router.post('/register', async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: 'Phone and password are required' });
  }

  const existingUser = await prisma.user.findUnique({ where: { phone } });

  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { phone, password: hashedPassword },
  });

  res.status(201).json({ message: 'User registered', userId: user.id });
});

// POST /login
router.post('/login', async (req, res) => {
  const { phone, password } = req.body;

  const user = await prisma.user.findUnique({ where: { phone } });

  if (!user) {
    return res.status(401).json({ message: 'Invalid phone or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid phone or password' });
  }

  const token = jwt.sign(
    { userId: user.id },                 
    process.env.JWT_SECRET as string,   
    { expiresIn: '7d' }                 
  );
  

  res.status(200).json({ message: 'Login successful', token });
});


router.get('/protected',authenticateToken, (req,res)=> {
  res.status(200).json({ message: 'You are authorized ✅', user: req.user });

})

export default router;
