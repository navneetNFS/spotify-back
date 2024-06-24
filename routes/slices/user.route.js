const express = require('express');
const user_route = express.Router()
const user_ctrl = require("../../controllers/user.ctrl")

user_route.get("/", (req,res) => {
    res.send("user route")
})

user_route.post("/", user_ctrl.createUser)

module.exports = user_route