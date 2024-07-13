import joi from 'joi'

export const signupSchema=joi.object({
    firstName:joi.string().required().lowercase().trim(),
    lastName:joi.string().required().lowercase().trim(),
    userName:joi.string().required().min(3).max(15).lowercase().trim(),
    email:joi.string().required().email(),
    password:joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .message('password must be 8 characters long and contain at least one lowercase letter,one uppercase letter,numbers,Special_Char'),
    role:joi.string().valid('User','Company_HR'),
    DOB: joi.date().required(),
    confirmPassword:joi.string().valid(joi.ref('password')).required(),
    mobileNumber:joi.string().required(),
    recoveryEmail:joi.string().email()

})

export const updatePassword=joi.object({
    currentPassword:joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .message('password must be 8 characters long and contain at least one lowercase letter,one uppercase letter,numbers,Special_Char'),
    newPassword:joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .message('password must be 8 characters long and contain at least one lowercase letter,one uppercase letter,numbers,Special_Char'),
    ReTypeNewPassword:joi.string().valid(joi.ref('newPassword')).required()
})

