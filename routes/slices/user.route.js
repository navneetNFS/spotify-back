const express = require('express');
const user_route = express.Router()
const user_ctrl = require("../../controllers/user.ctrl")

user_route.get("/", user_ctrl.getAllUsers)
user_route.get("/user-detail", user_ctrl.getSingleUser)

user_route.put("/", user_ctrl.editUser)
user_route.post("/", user_ctrl.createUser)

user_route.post("/login", user_ctrl.loginUser)

user_route.delete("/", user_ctrl.deleteUser)

module.exports = user_route