import Course from "../models/Course.js";
import axios from 'axios';

const createCourse = async(req , res)=>{
    try{
        const {prompt , title , language} = req.body;   
        if(!prompt){
            return res.status(400).json({msg : "Prompt is required"});
        }   
        const newCourse = new Course({
            userId : req.userId,
            prompt,
            title,
            language
        });
        await newCourse.save();
        
        // Trigger n8n webhook for prompt analysis
        try {
            const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/analyze-prompt';
            await axios.post(n8nWebhookUrl, {
                courseId: newCourse._id.toString(),
                prompt: newCourse.prompt
            });
        } catch (webhookErr) {
            console.error('Failed to trigger n8n webhook:', webhookErr.message);
            // Don't fail the course creation if webhook fails
        }
        
        res.status(201).json({courseId : newCourse._id});
    }catch(err){
        res.status(500).json({msg : "Server Error"});
    }
}

const getCourses = async(req , res)=>{
    try{
        const courses = await Course.find({userId : req.userId});
        res.status(200).json(courses);
    }catch(err){
        res.status(500).json({msg : "Server Error"});
    }
}

const updateCourseAnalysis = async(req , res)=>{
    try{
        const {id} = req.params;
        const {subject, level, language, style} = req.body;
        
        if(!subject || !level || !language || !style){
            return res.status(400).json({msg : "All analysis fields are required"});
        }
        
        const course = await Course.findById(id);
        if(!course){
            return res.status(404).json({msg : "Course not found"});
        }
        
        course.analysis = {
            subject,
            level,
            language,
            style
        };
        
        await course.save();
        
        // 🔥 Trigger Module 4 (Course Planning)
        try {
            const n8nPlanUrl = process.env.N8N_PLAN_WEBHOOK_URL || 'http://localhost:5678/webhook/plan-course';
            await axios.post(n8nPlanUrl, {
                courseId: course._id.toString(),
                analysis: course.analysis
            });
        } catch (webhookErr) {
            console.error('Failed to trigger plan webhook:', webhookErr.message);
        }
        
        res.status(200).json({msg : "Analysis updated successfully, planning started", analysis: course.analysis});
    }catch(err){
        res.status(500).json({msg : "Server Error"});
    }
}

const updateCoursePlan = async(req , res)=>{
    try{
        const {id} = req.params;
        const {title, modules} = req.body;
        
        if(!title || !modules){
            return res.status(400).json({msg : "Title and modules are required"});
        }
        
        const course = await Course.findByIdAndUpdate(
            id,
            {
                title,
                modules,
                status: "planned"
            },
            { new: true }
        );
        
        if(!course){
            return res.status(404).json({msg : "Course not found"});
        }
        
        // 🔥 Trigger Module 5 (Lesson Content Generation)
        try {
            const n8nLessonUrl = process.env.N8N_LESSON_WEBHOOK_URL || 'http://localhost:5678/webhook/generate-lessons';
            await axios.post(n8nLessonUrl, {
                courseId: course._id.toString(),
                courseTitle: course.title,
                modules: course.modules
            });
        } catch (webhookErr) {
            console.error('Failed to trigger lesson generation webhook:', webhookErr.message);
        }
        
        res.status(200).json({msg : "Course plan saved successfully, lesson generation started", course});
    }catch(err){
        res.status(500).json({msg : "Server Error"});
    }
}

const updateLessonContent = async(req , res)=>{
    try{
        const {id} = req.params;
        const {lessons} = req.body;
        
        if(!lessons || !Array.isArray(lessons)){
            return res.status(400).json({msg : "Lessons array is required"});
        }
        
        const course = await Course.findByIdAndUpdate(
            id,
            {
                $push: { lessons: { $each: lessons } },
                status: "content_generated"
            },
            { new: true }
        );
        
        if(!course){
            return res.status(404).json({msg : "Course not found"});
        }
        
        res.status(200).json({msg : "Lesson content saved successfully", course});
    }catch(err){
        res.status(500).json({msg : "Server Error"});
    }
}

export {createCourse , getCourses, updateCourseAnalysis, updateCoursePlan, updateLessonContent};