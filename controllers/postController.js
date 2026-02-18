const Post = require("../models/Post");

// Create Post
exports.createPost = async (req, res) => {
  try {
    const { text } = req.body;

    const imagePath = req.file ? req.file.filename : "";

    const post = await Post.create({
      user: req.user.id,
      text,
      image: imagePath
    });

    res.status(201).json({
      message: "Post created successfully",
      post
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get All Posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Like or Unlike Post
exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user.id;

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      // Like
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      message: alreadyLiked ? "Post unliked" : "Post liked",
      likesCount: post.likes.length
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Comment
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      user: req.user.id,
      text
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json({
      message: "Comment added successfully",
      comments: post.comments
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get Logged-in User's Posts
exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(posts);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if logged-in user is the owner
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit Post
exports.editPost = async (req, res) => {
  try {
    const { text } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check ownership
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to edit this post" });
    }

    post.text = text;
    await post.save();

    res.status(200).json({
      message: "Post updated successfully",
      post
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
