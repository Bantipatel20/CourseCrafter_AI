import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectdb = async(req , res)=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("Database Connected Successfully"))
    .catch((err)=>console.log(err));
}

export default connectdb;