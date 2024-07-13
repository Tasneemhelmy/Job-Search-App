import mongoose,{Schema} from "mongoose";

const userSchema= new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    recoveryEmail: {
        type: String
    },
    DOB: {
        type: Date,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['User','Company_HR'],
        required: true
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default:"offline"
    },
    confirmEmail:{
        type:Boolean,
        default:false
    }

})

const User=mongoose.model('User',userSchema)

export default User