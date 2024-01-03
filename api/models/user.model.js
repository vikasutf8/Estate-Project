import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        
    },
    avatar:{
        type:String,
        default :"https://lh3.googleusercontent.com/a/ACg8ocIzzXPm2zof6XhF1RBuBeu2ZLptI-4t1IVjehrEZiVdpyM=s96-c",
    },
},{timestamps:true})

const User =mongoose.model('User',userSchema);
export default User;