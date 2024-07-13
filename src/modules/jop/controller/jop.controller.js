import Application from "../../../../database/models/Application.model.js";
import Company from "../../../../database/models/company.model.js";
import Jop from "../../../../database/models/Jop.model.js";
import asyncHandler from "../../../middelware/asyncHandeller.js";
import AppError from "../../../utils/Error.js";



                            //1-Add Job 
// add jop with add companyId and companyHr
export const addJop=asyncHandler(async(req,res,next)=>{
    if(req.user.role!='Company_HR')
        return next(new AppError("Not Authorized To Acsess",400))
    req.body.addedBy=req.user._id
    const company=await Company.findOne({companyHR:req.user._id})
    if(!company)
        return next(new AppError("Your NOt HR Of any Company",400))
    req.body.company=company._id
    const job=await Jop.create(req.body)
    res.status(200).json({message:`Jop Added `,job})
})
//----------------------------------------------------------------------------

                            //2-Update Job
export const updateJop=asyncHandler(async(req,res,next)=>{
    if(req.user.role!='Company_HR')
        return next(new AppError("Not Authorized To Acsess",400))
    const update=await Jop.findOneAndUpdate({addedBy:req.user._id,_id:req.params.id},req.body,{new:true})
            if(!update)
                return next(new AppError("Jop Not Found",404))
        res.status(200).json({message:"Updated",update})
})
//--------------------------------------------------------------------------------
                            
                            //3-Delete Job
export const deleteJop=asyncHandler(async(req,res,next)=>{  
    if(req.user.role!='Company_HR')
        return next(new AppError("Not Authorized To Acsess",400))
    const delet=await Jop.findOneAndDelete({addedBy:req.user._id,_id:req.params.id})
        if(!delet)
            return next(new AppError("Jop Not Found",404))

        const app=await Application.findOneAndDelete({jobId:delet._id})
        res.status(200).json({message:"deleted",delet})
})
//--------------------------------------------------------------------------------

                        //4-Get all Jobs with their company’s information.
export const companyWithJops=asyncHandler(async(req,res,next)=>{
    const jops=await Jop.find().populate('company')
    res.status(200).json({message:"All Jobs",jops})  
}) 
//--------------------------------------------------------------------------------

                        //5-Get all Jobs for a specific company.
export const allJopsBySpecificCompany=asyncHandler(async(req,res,next)=>{
    const company=await Company.findOne({companyName:req.params.name})
    if(!company)
        return next(new AppError("Company Not Found",404))
    const jops=await Jop.find({company:company._id}).populate('company')
    res.status(200).json({message:`All Jobs with this company ${company.companyName}`,jops})
})
//---------------------------------------------------------------------------------------

                        //6-Get all Jobs that match the following filters 
export const filterJops=asyncHandler(async(req,res,next)=>{
    const {workingTime,jobLocation,seniorityLevel,jobTitle,technicalSkills}=req.body
    const filter = {};

        if (workingTime) 
            filter.workingTime = workingTime;

        if (jobLocation) 
            filter.jobLocation = jobLocation;

        if (seniorityLevel) 
            filter.seniorityLevel = seniorityLevel;

        if (jobTitle) 
            filter.jobTitle = jobTitle;

        if (technicalSkills) 
            filter.technicalSkills = { $in: technicalSkills.split(',') };


    const jops=await Jop.find(filter)
    if(!jops.length)
        return next(new AppError("No Jobs Found",404))
    res.status(200).json({message:"All Jobs",jops})
    
})
//--------------------------------------------------------------------------------------------

                            //7-Apply to Job
export const applyJop=asyncHandler(async(req,res,next)=>{
    if(req.user.role=='Company_HR')
        return next(new AppError("Not Authorized To Acsess",400))

    const jop=await Jop.findById(req.params.id)
    if(!jop)
        return next(new AppError("Job Not Found",404))
    
    const user=await Application.findOne({userId:req.user._id,jobId:req.params.id})
    if(user)
        return next(new AppError("You Already Applied To This Job",400))
    const {userTechSkills,userSoftSkills}=req.body
    req.body.userResume=req.file.filename
    req.body.userId=req.user._id
    req.body.jobId=jop._id
    
    const app=await Application.create(req.body)
    res.status(200).json({ message: 'Application submitted successfully' })
    
})
//-------------------------------------------------------------------------------------------------------------------
