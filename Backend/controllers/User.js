import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
const register = async(req ,res)=>{
    try{
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({msg : "Please enter all the fields"});
        }

        if(password.length < 6){
            return res.status(400).json({msg : "Password must be at least 6 characters long"});
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
           return res.status(400).json({msg : "User with this email already exists"}); 
        }

        const hashedpassword = await bcrypt.hash(password , 10);
        const newUser = new User({
            name,
            email,
            password : hashedpassword
        });
        const token = jwt.sign( {userId : newUser._id} , process.env.JWT_SECRET , {expiresIn : '1h'} ); 
        await newUser.save();
        res.status(201).json({token});
    }catch(err){
        res.status(500).json({msg : "Server Error"});
    }
}

const login = async(req , res)=>{
    try{
        const {email , password} = req.body;   
        if(!email || !password){
            return res.status(400).json({msg : "Please enter all the fields"});
        }  
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({msg : "Invalid Credentials"});
        }
        const isMatch = await bcrypt.compare(password , existingUser.password);
        if(!isMatch){
            return res.status(400).json({msg : "Invalid Credentials"});
        }
        const token = jwt.sign( {userId : existingUser._id} , process.env.JWT_SECRET , {expiresIn : '1h'} );
        res.status(200).json({token});
    }catch(err){
        res.status(500).json({msg : "Server Error"});
    }   
}

export {register , login};