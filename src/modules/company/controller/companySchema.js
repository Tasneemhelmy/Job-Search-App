import joi from 'joi'

const companySchema=joi.object({
    companyName:joi.string().required().trim(),
    description:joi.string().required(),
    industry:joi.string().required(),
    address:joi.string().required(),
    numberOfEmployees:joi.number().integer().min(11).max(20).required(),
    companyEmail:joi.string().email().required(),
    //companyHR:joi.string().required().length(24).hex()
})

export default companySchema