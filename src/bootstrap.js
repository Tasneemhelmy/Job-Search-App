import env from 'dotenv'
import authRouter from './auth/auth.route.js'
import userRouter from './modules/user/user.route.js'
import userCompany from './modules/company/company.route.js'
import jopRouter from './modules/jop/jop.route.js'
import connected from '../database/connection.js'
import globalError from './middelware/globalError.js'


const bootstrap=(app,express)=>{
    process.on('uncaughtException',(err)=>{
        console.log(err)
    })
    env.config()
    connected()
    app.use('/uploads',express.static('uploads'))
    app.use(express.json());
    app.use('/auth',authRouter)
    app.use('/user',userRouter)
    app.use('/company',userCompany)
    app.use('/jop',jopRouter)
    app.use(globalError)    
    process.on('unhandledRejection',(err)=>{
        console.log(err)
    })
}

export default bootstrap