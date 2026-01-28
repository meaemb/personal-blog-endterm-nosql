const Post = require("../models/Post");
const Comment = require("../models/Comment");

// TOP POSTS BY COMMENTS COUNT
exports.topPosts = async (req, res) => {
  try {
    const result = await Post.aggregate([
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post_id",
          as: "comments",
        },
      },
      {
        $addFields: {
          commentsCount: { $size: "$comments" },
        },
      },
      { $sort: { commentsCount: -1 } },
      {
        $project: {
          title: 1,
          commentsCount: 1,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TOP USERS BY COMMENTS
exports.topUsers = async (req, res) => {
  try {
    const result = await Comment.aggregate([
      {
        $group: {
          _id: "$user_id",
          commentsCount: { $sum: 1 },
        },
      },
      { $sort: { commentsCount: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          username: "$user.username",
          commentsCount: 1,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
