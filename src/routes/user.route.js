const mongoose=require("mongoose");
const express=require("express");
const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken")
const secretKey=process.env.SECRET_KEY
const app=express.Router();


app.get("/",(req,res)=>{
    res.send("User Section")
})

app.post("/signup",async(req,res)=>{
    const {email,password} = req.body;
    try{
     const user=new userModel({email,password});
     await user.save();
     res.status(201).send({msg:"Registration successfull",user})
    }catch(e){
     res.status(400).send({msg:"Something went wrong",error:e.message})
    }
})


app.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const user=await userModel.findOne({email,password});

    try{
    if(user){
        const token = jwt.sign({id:user._id,email:user.email},secretKey,{
            expiresIn:"1 day"
        })
        res.status(200).send({msg:"Login successfull",token})
    }else{
        res.status(404).send({msg:"User Not found"})
    }
    }catch(e){
     res.status(400).send({msg:"Something went wrong",error:e.message})
    }
})

module.exports=app