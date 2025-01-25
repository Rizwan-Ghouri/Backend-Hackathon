require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const courcesrouter = require("./routers/courserouter")
const usersrouter = require("./routers/userrouter")
const authrouter = require("./routers/authrouter")
const App = express();
App.use(express.json());

App.get((req,res)=>{
    res.send("Hello world")
})

App.use("/cources",courcesrouter)
App.use("/users",usersrouter)
App.use("/auth",authrouter)

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
App.listen(5000, (err) => {
    if (err) {
        console.error("Error starting Server", err)
    } else {
        console.log("server is listening");
    }
})
}).catch((err) => {
    console.log(err);
})