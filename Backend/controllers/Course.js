import Course from "../models/Course.js";


const createCourse = async(req , res)=>{
    try{
        const {prompt , title , language} = req.body;   
        if(!prompt){
            return res.status(400).json({msg : "Prompt is required"});
        }   
        const newCourse = new Course({
            usreId : req.userId,
            prompt,
            title,
            language
        });
        await newCourse.save();
        res.status(201).json({courseId : newCourse._id});
    }catch(err){
        res.status(500).json({msg : "Server Error"});
    }
}
const getCourses = async(req , res)=>{
    try{
        const courses = await Course.find({usreId : req.userId});
        res.status(200).json({courses});
    }catch(err){
        res.status(500).json({msg : "Server Error"});
    }
}
export {createCourse , getCourses};