import mongoose from 'mongoose';

const courseSchema =  new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        prompt:{
            type:String,
            required:true
        },
        title:String,
        language:{
                type:String,
                default:"English"
        },
        status:{
            type:String,
            enum:["processing","Completed"],
            default:"processing"
        },
        analysis: {
            subject: String,
            level: String,
            language: String,
            style: String
        },
        modules:[],
        videos:[]
    },
    {
        timestamps:true
    }
)

const Course = mongoose.model("Course",courseSchema);

export default Course;