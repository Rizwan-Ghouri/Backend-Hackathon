require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const courcesrouter = require("./routers/courserouter")
const usersrouter = require("./routers/userrouter")
const authrouter = require("./routers/authrouter")
const cors = require("cors")

const App = express();
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(cors());
App.use(cors({
  origin: "http://your-frontend-domain.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

App.get("/",(req,res)=>{
    res.send("Hello world , /user, /cources")
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