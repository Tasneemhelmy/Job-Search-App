import joi from 'joi'

const jopSchema=joi.object({
    jobTitle:joi.string().required().trim(),
    jobLocation:joi.string().valid('onsite','remotely','hybrid').required(),
    workingTime:joi.string().valid('part-time','full-time').required(),
    seniorityLevel:joi.string().valid('Junior','Mid-Level', 'Senior', 'Team-Lead', 'CTO').required(),
    jobDescription:joi.string().required().trim(),
    technicalSkills:joi.array().items(joi.string()).required(),
    softSkills:joi.array().items(joi.string()).required(),
    //addedBy:joi.string().required().length(24).hex()
})

export default jopSchema