const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { createPost, getPosts, toggleLike, addComment, getMyPosts, deletePost, editPost } = require("../controllers/postController");


// Get All Posts
router.get("/", getPosts);

// Get Logged-in User's Posts
router.get("/myposts", protect, getMyPosts);

// Delete Post (Protected)
router.delete("/:id", protect, deletePost);

// Edit Post
router.put("/:id", protect, editPost);

// Like or Unlike Post (Protected)
router.put("/:id/like", protect, toggleLike);

// Add Comment (Protected)
router.post("/:id/comment", protect, addComment);

// Create Post (Protected + Image Upload)
router.post("/", protect, upload.single("image"), createPost);

module.exports = router;
