const usermodel = require("../models/Usermodel");
const bcrypt = require('bcrypt');
const { SignUp, login } = require("./authcontroller");
// const UserModel = require('../models/Usermodel');

// const getUserWithAuth = async (req, res) => {
//     try {
//         const userId = req.params.id; // Ensure dynamic param

//         // Validate ObjectId
//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).send({
//                 isSuccessfull: false,
//                 message: "Invalid ID format"
//             });
//         }

//         // Query with Population
//         const user = await UserModel.findById(userId).populate('authId');

//         if (!user) {
//             return res.status(404).send({
//                 isSuccessfull: false,
//                 message: "User not found"
//             });
//         }

//         res.status(200).send({
//             isSuccessfull: true,
//             data: user
//         });
//     } catch (error) {
//         res.status(500).send({
//             isSuccessfull: false,
//             message: error.message
//         });
//     }
// };

// module.exports = getUserWithAuth ;

const usercontroller = {
    get: async (req,res)=>{
        try {
            const result = await usermodel.find({})
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
            console.log(id);
            const result = await usermodel.findById({id})
            
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
   
    add: async (req, res) => {
        try {
            const body = req.body;
    
            // Password Hashing
            const saltRounds = 8;
            const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    
            const userObj = {
                username: body.username,
                email: body.email,
                password: hashedPassword // Save hashed password
            };
    
            const resObj = new usermodel({ ...userObj });
    
            resObj.save().then((dbRes) => {              
                res.status(201).send({
                    isSuccessfull: true,
                    data: dbRes,
                    message: "User added successfully"
                });
            }).catch((saveError) => {
                res.status(400).send({
                    isSuccessfull: false,
                    message: saveError.message,
                    data: saveError
                });
            });
        } catch (error) {
            res.status(400).send({
                isSuccessfull: false,
                message: error.message,
                data: error
            });
        }
    },
    
    edit:async (req,res)=>{
        try {
            const id = req.params.id
            const body = req.body;
            if (body.password) {
                const saltRounds = 7;
                const hashedPassword = await bcrypt.hash(body.password, saltRounds);
                body.password = hashedPassword; // Update password with hashed password
            }
            const result = await usermodel.findByIdAndUpdate(id,body,{new: true})
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
            const result = await usermodel.findByIdAndDelete(id)
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

module.exports = {usercontroller};