const express = require("express");
const UserController = require("../controller/usercontroller");

const Route = express.Router();

Route.get('/auth/:id', UserController.getUserWithAuth);
Route.get("/",UserController.usercontroller.get);
Route.get("/:id",UserController.usercontroller.getById);
Route.post("/",UserController.usercontroller.add);
Route.put("/:id",UserController.usercontroller.edit);
Route.delete("/:id",UserController.usercontroller.delete)

module.exports = Route;