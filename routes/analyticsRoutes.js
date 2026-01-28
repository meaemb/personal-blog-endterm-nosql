const express = require("express");
const router = express.Router();

const {
  topPosts,
  topUsers,
} = require("../controllers/analyticsController");

router.get("/top-posts", topPosts);
router.get("/top-users", topUsers);

module.exports = router;
