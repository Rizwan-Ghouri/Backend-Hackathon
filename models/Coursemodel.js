const mongoose = require("mongoose");

const CourseSchema= mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    duration:{
        type:Number,
        required:true,
        default:6
    }
},{timeStamp: true})

const CourseModel = mongoose.model("Course",CourseSchema)
module.exports = CourseModel;