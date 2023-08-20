const express=require('express')
const {UserModel}=require('../model/UserModel')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const userRouter=express.Router()

userRouter.post('/register',(req,res)=>{
    console.log(req.body)
    const {username,email,password}=req.body
    try{
        bcrypt.hash(password,5,async function(err, hash) {
            if(err){
                res.status(400).send({'err':err})
              }else{
                const user=new UserModel({username,email,password:hash})
                await user.save()
                res.status(200).send({'msg':'New user is registered successfully'})
              }
        });
    }
    catch(err){
        res.status(400).send({'error':err})
    }})


userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body
    console.log(req.body)
    
    try{
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password, function(err, result) {
                if(err){
                    res.status(400).send({'err':err})
                }else{
                    const token = jwt.sign({userID:user._id,user:user.username}, 'masai');
                    res.status(200).send({'msg':'User logged in successfully',token})
                }
            })
        }
        else{
            res.status(200).send({'msg':"User does not exist!"})
        }
       
    }
    catch(err){
        res.status(400).send({'err':err})
    }
})


    


module.exports={userRouter}