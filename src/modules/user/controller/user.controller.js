import bcryptjs from "bcryptjs";
import { customAlphabet } from "nanoid"
import User from "../../../../database/models/User.model.js";
import asyncHandler from "../../../middelware/asyncHandeller.js";
import AppError from "../../../utils/Error.js";
import { sendEmail } from "../../../utils/sendEmail.js";
import Company from "../../../../database/models/company.model.js";
import Jop from "../../../../database/models/Jop.model.js";
import Application from "../../../../database/models/Application.model.js";



                    //3-update account.
export const updateAcc=asyncHandler(async(req,res,next)=>{
    const{email,mobileNumber,recoveryEmail,DOB,lastName,firstName}=req.body

    const user=await User.findByIdAndUpdate(req.user._id,{email,mobileNumber,recoveryEmail,DOB,lastName,firstName},{new:true})
    user.userName=firstName+" "+lastName;
    await user.save()
    if(!user)
        return next(new AppError("Not Authorized To Acsess This Acount",400))

    return res.status(201).json({message:"updated",user})

})
//-------------------------------------------------------------------------------

                           //4-Delete account
export const deleteAcc=asyncHandler(async(req,res,next)=>{
                        
    const user=await User.findByIdAndDelete(req.user._id)
    if(!user)
    return next(new AppError("Not Authorized To Acsess This Acount",400))
    if(req.user.role=='Company_HR'){
        const company=await Company.findOneAndDelete({companyHR:user._id})
        const jop=await Jop.findOneAndDelete({addedBy:user._id})
        if(!jop)
            return next(new AppError("Deleted",400))
        const app=await Application.findOneAndDelete({jobId:jop._id})
    }
    
    return res.status(201).json({message:"Deleted",user})
                        
})
//-------------------------------------------------------------------------------

                          //5-Get user account data 
export const getAcc=asyncHandler(async(req,res,next)=>{
    const user=await User.findById(req.user._id)
    if(!user)
        return next(new AppError("Not Authorized To Acsess This Acount",400))
    return res.status(201).json({message:"Account Data",user})
})
//----------------------------------------------------------------------------------

                          //6-Get profile data for another user 
export const getAnthorAcc=asyncHandler(async(req,res,next)=>{
    const user=await User.findById(req.params.id,{"email":0,"password":0,"confirmEmail":0,"mobileNumber":0})
    if(!user)
        return next(new AppError("NOt Found This Account",400))
        return res.status(201).json({message:"Account Data",user})
})
//----------------------------------------------------------------------------------

                            //7-Update password
export const changePass=asyncHandler(async(req,res,next)=>{
    const {currentPassword,newPassword,ReTypeNewPassword}=req.body
    const user=await User.findById(req.user._id)
    if(!user)
        return next(new AppError("Not Authorized To Acsess This Acount",400))

    const isMatch=bcryptjs.compareSync(currentPassword,user.password)
    if(!isMatch)
        return next(new AppError("Password is not correct",400))
    if(newPassword!==ReTypeNewPassword)
        return next(new AppError("ReTypeNewPassword must be similer newPassword ",400))

    const hashNewPass=bcryptjs.hashSync(newPassword,9)

    const pass=await User.updateOne({_id:user._id},{password:hashNewPass})
    return res.status(201).json({message:"Password Updated"})
})
//----------------------------------------------------------------------------------

                             //8-Forget password
export const forgetPass=asyncHandler(async(req,res,next)=>{
    const {email}=req.body
    const user=await User.findOne({email})
    if(!user)
        return next(new AppError("This Email is not registered",400))
    
    const randomNumber=customAlphabet('0123456789',4)
    const randomNum=randomNumber()
    sendEmail({to:email,html:`<h1>${randomNum}</h1>`})


    return next(new AppError("Done",200))
})
//---------------------------------------------------------------------------------

                        //9-Get all accounts associated to a specific recovery Email

export const allAcountBYRecoveryEmail=asyncHandler(async(req,res,next)=>{
    const user=await User.find({recoveryEmail:req.params.email}).select("userName recoveryEmail role status")
    if(!user.length)
        return next(new AppError("No Account Found",400))
    return res.status(201).json({message:"All Accounts",user})
})
//---------------------------------------------------------------------------------------------------------------------------------------------