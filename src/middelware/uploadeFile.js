import multer from 'multer'
import {v4 as uuidv4} from 'uuid'
import AppError from '../utils/Error.js'

export const customVaildation={
    bdf: "application/pdf"
}

export const uploads=(customVaildation)=>{
    const storage=multer.diskStorage({
        destination:function (req,file,cb){
            cb(null,'uploads/')
        },
        filename:function (req,file,cb){
            cb(null,uuidv4()+'_'+ file.originalname)
        }
    })
    const fileFilter=(req,file,cb)=>{
        if(customVaildation==(file.mimetype)){
        cb(null,true)
        }
        else  cb(new AppError("Invaild Format",400))
    
    
    }
    const upload=multer({storage,fileFilter})

    return upload
}