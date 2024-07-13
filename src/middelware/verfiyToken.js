import jwt from'jsonwebtoken'
import User from '../../database/models/User.model.js'
import asyncHandler from './asyncHandeller.js'


export const verfiyToken= asyncHandler(async(req,res,next)=>{
    const authorization= req.headers.authorization
        const token=authorization.split('Bearer ')[1]
        const payload=jwt.verify(token,process.env.TOKEN_KEY)
        if(!payload)
            return res.status(404).json({message:"Invaild Payload"})

        req.user=payload

        const userEXsist=await User.findById(payload._id)
        if(!userEXsist)
            return res.status(404).json({message:"This Token Not Work"})

        next()
})

export default verfiyToken