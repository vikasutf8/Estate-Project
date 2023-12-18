import express from 'express';
import {mongoose} from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('Connected ')
}).catch((err)=>{
    console.log(err)
})

const app =express();
const port =process.env.PORT ||3000
app.listen(port,()=>{
    console.log(`server running ${port}`)
})