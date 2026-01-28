const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  updateTags,
} = require("../controllers/postController");

router.post("/", auth, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.put("/:id/tags", auth, updateTags); // ADVANCED

module.exports = router;
