const Comment = require("../models/Comment");

// CREATE COMMENT
exports.createComment = async (req, res) => {
  try {
    const { content, post_id } = req.body;

    const comment = await Comment.create({
      content,
      post_id,
      user_id: req.user.id,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET COMMENTS BY POST
exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post_id: req.params.postId })
      .populate("user_id", "username email")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE COMMENT (owner or admin)
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (
      comment.user_id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADVANCED DELETE — DELETE ALL COMMENTS OF POST
exports.deleteCommentsByPost = async (req, res) => {
  try {
    await Comment.deleteMany({ post_id: req.params.postId });
    res.json({ message: "All comments deleted for this post" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
