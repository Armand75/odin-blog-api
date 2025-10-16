const express = require('express');
const passport = require('passport');
const { addComment, getCommentsByPostId, deleteComment } = require('../controllers/commentController');
const { isAuthorOrAdmin, isAdmin } = require('../middlewares/authMiddlewares');

const router = express.Router();

router.post("/", passport.authenticate("jwt", { session: false }), addComment);
router.get("/:postId", passport.authenticate("jwt", { session: false }), getCommentsByPostId);
router.delete("/:id", passport.authenticate("jwt", { session: false }), isAuthorOrAdmin, deleteComment);

module.exports = router;