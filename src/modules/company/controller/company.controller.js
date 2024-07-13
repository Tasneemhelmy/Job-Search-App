import Application from "../../../../database/models/Application.model.js";
import Company from "../../../../database/models/company.model.js";
import Jop from "../../../../database/models/Jop.model.js";
import asyncHandler from "../../../middelware/asyncHandeller.js";
import AppError from "../../../utils/Error.js";


                            //1-Add company
export const addCompany=asyncHandler(async(req,res,next)=>{
    if(req.user.role!='Company_HR')
        return next(new AppError("Not Authorized To Acsess",400))
    req.body.companyHR=req.user._id
    const company=await Company.create(req.body)
    res.status(200).json({message:"Added",company})
})
//--------------------------------------------------------------------------------

                            //2-Update company data
export const updateCompany=asyncHandler(async(req,res,next)=>{
    if(req.user.role!='Company_HR')
        return next(new AppError("Not Authorized To Acsess",400))
    const {address,companyEmail,description,industry}=req.body
    const update=await Company.findOneAndUpdate({companyHR:req.user._id},req.body,{new:true})
    if(!update)
        return next(new AppError("Company Not Found",404))
    res.status(200).json({message:"Updated",update})
})
//--------------------------------------------------------------------------------

                         //3-Delete company data
export const deleteCompany=asyncHandler(async(req,res,next)=>{
    if(req.user.role!='Company_HR')
        return next(new AppError("Not Authorized To Acsess",400))
    const delet=await Company.findOneAndDelete({companyHR:req.user._id})
    if(!delet)
        return next(new AppError("Company Not Found",404))
    const jop=await Jop.findOneAndDelete({addedBy:req.user._id})
    if(!jop)
        return next(new AppError("Deleted",404))
        const app=await Application.findOneAndDelete({jobId:jop._id})
    res.status(200).json({message:"deleted",delet})
})
//--------------------------------------------------------------------------------

                          //4-Get company data
export const companyData=asyncHandler(async(req,res,next)=>{
    if(req.user.role!='Company_HR')
        return next(new AppError("Not Authorized To Acsess",400))
    const exist =await Company.findById(req.params.id)
    if(!exist)
        return next(new AppError("Company Not Found",404))

    const Jops= await Jop.find({company:exist._id}).populate('company')
    if(!Jops.length)
        return next(new AppError("Jops Not Found",404))
    res.status(200).json({message:"Company's jops",Jops})
})
//---------------------------------------------------------------------------------

                          //5-Search for a company with a name.
export const getCompanyByName=asyncHandler(async(req,res,next)=>{
    const company =await Company.findOne({companyName:req.params.name})
    if(!company)
        return next(new AppError(" Not Found Company With This Name",404))
    res.status(200).json({message:"Found",company})
})
//---------------------------------------------------------------------------------

                        //6-Get all applications for specific Job
export const allAppSpecificJop=asyncHandler(async(req,res,next)=>{
    if(req.user.role!='Company_HR')
        return next(new AppError("Not Authorized To Acsess",400))

    const companyHr=await Jop.findOne({_id:req.params.id,addedBy:req.user._id})
    if(!companyHr)
        return next(new AppError("Not Authorized To Acsess",404))

    const jop=await Application.find({jobId:companyHr._id}).populate({
        path:'userId',
        select:'name email userName mobileNumber recoveryEmail DOB status'
    })
    if(!jop.length)
        return next(new AppError("No Applications Found ",404))
    res.status(200).json({message:"Applications",jop})
})
//---------------------------------------------------------------------------------