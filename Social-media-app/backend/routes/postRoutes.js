const express = require("express");
const router = express.Router();

const {createPost,getAllPosts,getSinglePost,updatePost,deletePost,likePost} = require("../controllers/postcontroller");
router.post("/create", createPost);
router.get("/all",getAllPosts);
router.get("/:id",getSinglePost);
router.put("/update/:id",updatePost);
router.put("/like/:id",likePost);
router.delete("/delete/:id",deletePost);

module.exports = router;