import mongoose,{Schema} from "mongoose";

const applicationSchema=new Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jop',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userTechSkills: {
        type: [String],
        required: true
    },
    userSoftSkills: {
        type: [String],
        required: true
    },
    userResume: {
        type: String,
        required: true
    }
})

applicationSchema.post('init',(doc)=>{
    doc.userResume="http://localhost:3000/uploads/"+doc.userResume
})

const Application=mongoose.model('Application',applicationSchema)

export default Application