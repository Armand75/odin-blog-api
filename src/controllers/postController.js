const prisma = require('../config/prisma');

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true, comments: true },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: { author: true, comments: true },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await prisma.post.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  deletePost,
};