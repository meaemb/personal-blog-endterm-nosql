const Post = require("../models/Post");

// CREATE POST
exports.createPost = async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;

    const post = await Post.create({
      title,
      content,
      tags,
      status,
      author_id: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL POSTS
exports.getPosts = async (req, res) => {
  try {
    const { tag, author } = req.query;

    const filter = {};
    if (tag) filter.tags = tag;
    if (author) filter.author_id = author;

    const posts = await Post.find(filter)
      .populate("author_id", "username email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET POST BY ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author_id",
      "username email"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE POST
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (
      post.author_id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    Object.assign(post, req.body);
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE POST
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (
      post.author_id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADVANCED UPDATE — ADD / REMOVE TAG
exports.updateTags = async (req, res) => {
  try {
    const { action, tag } = req.body;

    let update;
    if (action === "add") {
      update = { $addToSet: { tags: tag } };
    } else if (action === "remove") {
      update = { $pull: { tags: tag } };
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
