import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../../middelware/asyncHandeller.js";
import User from "../../../database/models/User.model.js";
import  { createHtml,sendEmail} from "../../utils/sendEmail.js";
import AppError from "../../utils/Error.js";






                    //1-Sign Up
export const signUp=asyncHandler(async(req,res,next)=>{
        const {password,email}=req.body
        const hashPass=bcryptjs.hashSync(password,9)
        req.body.password=hashPass
        const token =jwt.sign({email},process.env.TOKEN_KEY)
        const html=createHtml(token)
        const user=await User.create(req.body)
        sendEmail({to:email,html})
        res.status(200).json({massage:"signUp Successfully🤯",user})
})
//--------------------------------------------------------------------------------------


                       //Sign In
export const logIn=asyncHandler(async(req,res,next)=>{
        const { identifier, password } = req.body;
        let  user;
    if (/\S+@\S+\.\S+/.test(identifier))  // Check for email format
                user = await User.findOne({  email: identifier }); 
        else 
                user = await User.findOne({ mobileNumber: identifier });

        if (!user) 
                return next(new AppError('Please signUp First😤',404))

        if(!user.confirmEmail)
                return next(new AppError('Please Confirm Your Email😤',400))

        const isMatch=bcryptjs.compareSync(password,user.password)
        if(!isMatch)
                return next(new AppError('Invaild UserName Or Password😤',400))

        const token=jwt.sign({email:user.email,_id:user._id,role:user.role},process.env.TOKEN_KEY)
        await User.findByIdAndUpdate(user._id,{status:"online"})

        res.status(200).json({massage:"Login Successfully😎",token})
}) 
//--------------------------------------------------------------------------------------


                       //confirmEmail
export const confirmEmail=asyncHandler(async(req,res,next)=>{
        const tokenEmail=jwt.verify(req.params.token,process.env.TOKEN_KEY)

        const confirm=await User.updateOne({email:tokenEmail.email},{confirmEmail:true})
        res.status(200).json({message:"Email Confirmed"})
        
})
//----------------------------------------------------------------------------------------