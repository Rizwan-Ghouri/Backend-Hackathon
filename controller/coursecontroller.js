const CourseModel = require("../models/Coursemodel")

const courcescontroller = {
    get: async (req,res)=>{
        try {
            const result = await CourseModel.find({})
            res.status(200).send({
                isSuccessfull:true,
                data: result
            })
        } catch (error) {
            res.status(400).send({
                isSuccessfull:false,
                message:error.message,
                data:error
            })
        }
    },
    getById:async (req,res)=>{
        try {
            const id = req.params.id
            const result = await CourseModel.findById({id})
            res.status(200).send({
                isSuccessfull:true,
                data: result
            })
        } catch (error) {
            res.status(400).send({
                isSuccessfull:false,
                message:error.message,
                data:error
            })
        }
    },
    add:(req,res)=>{
        try {
            try {
                const body = req.body
                const courseobj ={
                    name:body.name,
                    duration:body.duration
                }
                const resobj = new CourseModel({...courseobj})
    
                resobj.save().then((dbres)=>{
                    res.status(201).send({
                        isSuccessfull:true,
                        data:dbres,
                        message:"Courcse Add Succsefully"
                    })
                })
            } catch (error) {
                throw error
            }
        } catch (error) {
            res.status(400).send({
                isSuccessfull:false,
                message:error.message,
                data:error
            })
        }
    },
    edit:async (req,res)=>{
        try {
            const id = req.params.id
            const body = req.body;
            const result = await CourseModel.findByIdAndUpdate(id,body,{new: true})
            res.status(200).send({
                isSuccessfull:true,
                message:"record update Success",
                data: result
            })
        } catch (error) {
            res.status(400).send({
                isSuccessfull:false,
                message:error.message,
                data:error
            })
        }
    },
    delete:async (req,res)=>{
        try {
            const id = req.params.id
            const result = await CourseModel.findByIdAndDelete(id)
            res.status(200).send({
                isSuccessfull:true,
                message:"deleted Success",
            })
        } catch (error) {
            res.status(400).send({
                isSuccessfull:false,
                message:error.message,
                data:error
            })
        }
    },
}
module.exports = courcescontroller