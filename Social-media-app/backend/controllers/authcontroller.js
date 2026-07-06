const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register= async(req,res)=>{
    try{
        const{name,email, password} = req.body;
        if(!name || !email || ! password){
          return res.json({
            message:"All fields must be filled"
          });
          
        }
        const existingUser = await User.findOne({email})
        
        if(existingUser){
          return res.json({
            message:'User Already Exists'
          })
        }
        const hashPassword = await bcrypt.hash(password,10)
        
        const newUser = new User({
          name,
          email,
          password:hashPassword
        })
        
        await newUser.save();
        res.json({
          message:'user created successfully'
        })
    }catch(error){
      console.log(error);
      res.status(500).json({
        message:"server error"
      })
    }
}


const login = async (req,res)=> {
    try{
      const {email, password}= req.body;
      if(!email || !password ){
        return res.json({
          message:"All fields must be completed"
        })
      }
      const user = await User.findOne({email});
      if(!user){
        return res.json({
          message:"User not found"
        })
      }
      const validPassword = await bcrypt.compare(password,user.password);
      if (!validPassword){
        return res.json({
          message:"Incorrect password"
            
        })
      }
      res.json({
        message:"Login successful",
        user
      })
        
    }catch(error){
      console.log(error);
      res.status(500).json({
        message:"server error "
      })
    }
  }

const getUser = async(req,res)=>{
    try{
      const{id} = req.params;
      const user = await User.findById(id). select("-password");
      if(!user){
        return res.json({
          message:"User not found"
        })
      }
      res.json(user);
    }catch(error){
      console.log(error);
      res.status(500).json({
        message:"server error"
      })
    }
}
 
const updateProfile = async (req,res) =>{
    try{
      const{id} = req.params;
      const{ name, email } = req.body;
      const user = await User.findByIdAndUpdate(
        id,
        {name,email},
        {new:true}
        );
        res.json({
          message:"Profile updated",
          user,
        });
    }catch(error){
      res.status(500).json({
        message:"server error"
      })
    }
}
module.exports = {
    register,
    login,
    getUser,
    updateProfile
}