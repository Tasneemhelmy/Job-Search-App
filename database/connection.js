import mongoose from "mongoose";

const connected=()=>{
    
    mongoose.connect(process.env.DB_CONNECTION).then(()=>{
        console.log("connected to database")
    }).catch((err)=>{
        console.log(err)
    })
}
export default connected