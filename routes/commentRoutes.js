const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
  createComment,
  getCommentsByPost,
  deleteComment,
} = require("../controllers/commentController");

router.post("/", auth, createComment);
router.get("/post/:postId", getCommentsByPost);
router.delete("/:id", auth, deleteComment);

module.exports = router;
