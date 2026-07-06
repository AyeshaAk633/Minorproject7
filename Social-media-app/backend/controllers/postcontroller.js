const User = require("../models/User");
const Post = require("../models/Post");

const createPost = async(req,res) =>{
    try{
      const {user, description} = req.body;
      if(!user || !description){
        return res.json({
          message:"All fields are required"
        })
      }
      const existingUser = await User.findById(user);
      if(!existingUser){
        return res.json({
          message:"User not found"
        })
      }
      const newPost = new Post({
        user,
        description 
      })
      await newPost.save();
      res.json({
        message:"Post created successfully ",
        post:newPost
      })
    }catch(error){
      console.log(error);
      res.status(500).json({
        message:"server error"
      })
    }
}


const getAllPosts = async (req,res) =>{
    try{
      const posts = await Post.find().populate("user","name email");
      res.json(posts);
    }catch(error){
      console.log(error);
      res.status(500).json({
        message:"server error"
      })
    }
}


const getSinglePost = async (req,res) =>{
    try{
      const{id} = req.params;
      const post = await Post.findById(id).populate("user","name email");
      if(!post){
        return res.json({
          message:"Post not found"
        })
      }
      res.json(post);
    }catch(error){
      console.log(error);
      res.status(500).json({
        message:"server error"
      })
    }
}


const updatePost = async(req,res) => {
    try{
      const {id} = req.params;
      const {description} = req.body;
      const post = await Post.findByIdAndUpdate(
        id,
        {description},
        { new: true }
    );
    
    if (!post) {
      return res.json({
        message: "Post not found",
      });
    }
    
    res.json({
      message: "Post updated successfully",
      post
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
}


const deletePost = async(req,res) =>{
    try{
      const {id} = req.params;
      const{user} = req.body;
      const post = await Post.findById(id);
      if(!post){
        return res.json({
          message:"Post not found"
        })
      }
      if(post.user.toString() !== user){
        return res.json({
          message:"Only your own posts you can delete"
        })
      }
      await Post.findByIdAndDelete(id);
      res.json({
        message:"Post deleted"
      })
    }catch(error){
      console.log(error);
      res.status(500).json({
        message:"server error"
      })
    }
}


const likePost = async (req,res) =>{
    try{
      const{id} = req.params;
      const {user} = req.body;
      const post = await Post.findById(id);
      if(!post){
        return res.json({
          message:"post not found"
        })
      }
      if(post.likes.includes(user)){
        post.likes = post.likes.filter(
          (like) => like.toString() !== user
        );
        await post.save();
        return res.json({
          message:"post unliked",
          post
        })
      }
      post.likes.push(user);
      await post.save();
      res.json({
        message:"post liked",
        post
      })
    }catch(error){
      console.log(error);
      res.status(500).json({
        message:"server error"
      })
    }
}

module.exports ={
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  likePost
}