// backend/src/routes/protected.ts

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


import express from "express";
import { authenticateToken, AuthRequest } from "../middleware/authMiddleware"; // ✅ clean import

const router = express.Router();

router.get("/posts", authenticateToken, (req: AuthRequest, res) => {
  res.json({
    message: "you accessed a protected route!",
    user: req.user,
  });
});

router.post("/post", authenticateToken, async (req:AuthRequest,res)=> {
    const content = req.body.content;
    const userId = req.body.userId;
    // res.json({
    //     content: content,
    //     userId : userId,
    // });
  try {
    const post = await prisma.post.create({
      data: {
        content,
        userId,
      },
    });
    console.log("post added in db successfully")

    res.sendStatus(201);
  } catch (error) {
    console.log(error)
  }

});


router.post("/comment", authenticateToken, async (req:AuthRequest,res)=> {
  const content = req.body.content;
  const postId = req.body.postId;
  const userId = req.body.userId;
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId
      },
    })
    res.sendStatus(201).json({ message: 'comment added', userId: userId });
  } catch (error) {
    console.log(error)
  }
})


router.post("/reply", authenticateToken, async (req:AuthRequest,res)=> {
  const content = req.body.content;
  const commentId = req.body.commentId;
  const userId = req.body.userId;
  try {
    const comment = await prisma.reply.create({
      data: {
        content,
        commentId,
        userId
      },
    })
    res.sendStatus(201).json({ message: 'reply added', userId: userId });
  } catch (error) {
    console.log(error)
  }
})

export default router;
