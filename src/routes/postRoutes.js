const express = require("express");
const passport = require("passport");
const {
  getAllPosts,
  createPost,
  getPostById,
  deletePost,
} = require("../controllers/postController");
const {isAuthorOrAdmin, isAdmin} = require("../middlewares/authMiddlewares");

const router = express.Router();

router.get("/", passport.authenticate("jwt", { session: false }), getAllPosts);
router.post("/", passport.authenticate("jwt", { session: false }), isAuthorOrAdmin, createPost);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getPostById
);
router.delete(
  "/:id", passport.authenticate("jwt",  { session: false }),
  isAuthorOrAdmin,
  deletePost
);

module.exports = router;
