import { errorHandler } from '../Utils/error.js';
import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'


export const signup = async (req, res,next) => {
    //    console.log(req.body)
    const { username, email, password } = req.body;
    const hashedPassword =bcryptjs.hashSync(password,10)
    const newUser = new User({ username, email, password:hashedPassword });
    try {
        await newUser.save()
    res.status(201).json("User created successfully")
    } catch (error) {
        // res.status(500).json(error.message)
        // next(errorHandler(550,"error from the function"))
        next(error)
    }

    
}
