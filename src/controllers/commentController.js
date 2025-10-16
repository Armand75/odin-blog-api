const prisma = require('../config/prisma');

const addComment = async (req, res) => {
  const { postId, content } = req.body;
  const userId = req.user.id;

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: userId,
      },
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};  

const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(postId) },
      include: { author: true },
    });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};  

const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await prisma.comment.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  addComment,
  getCommentsByPostId,
  deleteComment,
};