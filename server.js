require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

// ===== MIDDLEWARES =====
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ===== TEST ROUTE =====
app.get("/", (req, res) => {
  res.json({ message: "Personal Blog API is running" });
});

// ===== ROUTES =====
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/analytics", analyticsRoutes);


// ===== SERVER START =====
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server start failed:", error.message);
    process.exit(1);
  }
}

startServer();
