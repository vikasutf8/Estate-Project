import express from 'express';
import {mongoose} from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
import AuthRouter from './routers/auth.route.js'
import userRouter from './routers/user.route.js'


mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('Connected ')
}).catch((err)=>{
    console.log(err)
})

const app =express();
app.use(express.json())
const port =process.env.PORT ||3000

app.use("/api/user",userRouter)
app.use("/api/auth",AuthRouter)

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message =err.message ||'Internet server Error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})

app.listen(port,()=>{
    console.log(`server running ${port}`)
})