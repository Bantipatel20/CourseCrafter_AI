import mongoose from 'mongoose';

const courseSchema =  new mongoose.Schema(
    {
        usreId:{
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
        module:[],
        videos:[]
    },
    {
        tiomestamps:true
    }
)

const Course = mongoose.model("Course",courseSchema);

export default Course;