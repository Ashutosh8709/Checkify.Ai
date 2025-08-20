const UserModel=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();


const signup=async(req,res)=>{
    try{
        const {name,email,password,phone}=req.body;
        const user=await UserModel.findOne({email});
        if(user){
            return res.json({
                message:"User already Exists",
                success:false
            });
        }
        const newUser=new UserModel({name,email,password,phone});
        newUser.password=await bcrypt.hash(password,10);
        await newUser.save();
        res.json({
            message:"Signup Successfull",
            success:true
        });
    }catch(err){
        res.json({
            message:"Internal Server Error",
            success:false
        });
    }
}


const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await UserModel.findOne({email});
        if(!user){
            return res.json({
                message:"User Does not Exist",
                success:false
            });
        }
        const isPasswordEqual=await bcrypt.compare(password,user.password);
        if(!isPasswordEqual){
            return res.json({
                message:"Wrong Password,Kindly check the password and try again",
                success:false
            });
        }
        const jwtToken=jwt.sign(
            {email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
        res.json({
            message:"Login success",
            success:true,
            userId:user.id,
            jwtToken,
            email,
            name:user.name,
        })
}catch(err){
        console.error("Login Error:", err);
        res.json({
            message:"Internal Server Error",
            success:false
        })
    }
}

module.exports={signup,login};