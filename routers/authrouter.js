const express = require("express");
const AuthController = require("../controller/authcontroller");

const Route = express.Router();

Route.post("/signup",AuthController.SignUp);
Route.post("/login",AuthController.login)

module.exports = Route;