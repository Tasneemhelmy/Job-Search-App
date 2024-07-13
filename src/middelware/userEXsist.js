import User from "../../database/models/User.model.js";
import AppError from "../utils/Error.js";
import asyncHandler from './asyncHandeller.js'


export const userExist=asyncHandler(async(req,res,next)=>{
    const {email,mobileNumber}=req.body
    const emailUser=await User.findOne({email})
    const mobileUser=await User.findOne({mobileNumber})
    //const recoveryEmailUser=await User.findOne({recoveryEmail})

    if(emailUser|| mobileUser)
        return next(new AppError('User Aready Exist🤐',409))

        next()
})

export default userExist

