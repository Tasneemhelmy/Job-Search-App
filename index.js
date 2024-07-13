import express from 'express'
import cors from 'cors'
import bootstrap from'./src/bootstrap.js'

const app=express();
const port=process.env.PORT||3000;
app.use(cors());

bootstrap(app,express)
app.listen(port,(error)=>{
    if(error) console.log(error)
        else console.log(`server running on port ${port}`);  
    });