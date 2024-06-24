const express = require("express")
const api_route = express.Router();
const user = require("./slices/user.route")

api_route.use('/user', user)

module.exports = api_route