// src/routes/auth.ts
import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authenticateToken } from '../middleware/authMiddleware';
import {supabase} from "../utils/supabase"
dotenv.config();




const router = express.Router();

// POST /register
router.post('/register', async (req, res) => {
  
  
  try {
    const { name, phone, password } = req.body;

  if (!phone || !password || !name) {
    return res.status(400).json({ message: 'Name, phone, and password are required' });
  }

  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('phone')
    .eq('phone', phone)
    .maybeSingle();

  if(existingUser) {
    return res.status(409).json({message : "User already exist"});
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  
  
  const { data: newUser, error : insertError }  = await supabase
  .from('users')
  .insert({ name , phone , password : hashedPassword })
  .select()
  .single();
  if (insertError) {
    return res.status(500).json({ message: 'Error creating user', error: insertError.message });
  }

  const token = jwt.sign(
    { userId: newUser.id },                 
    process.env.JWT_SECRET as string,   
    { expiresIn: '7d' }                 
  );
  

  res.status(200).json({ message: 'Register successful', token, userId : newUser.id });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }

});

// POST /login
// POST /login
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: 'Phone and password are required' });
    }

    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('phone', phone)
      .maybeSingle();

    if (fetchError) {
      return res.status(500).json({ message: 'Error fetching user', error: fetchError.message });
    }

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

    res.status(200).json({ message: 'Login successful', token, userId: user.id, area: user.area});
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
