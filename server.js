const express = require('express')
const app = express()
const dotenv = require("dotenv")
dotenv.config({path: "./config/config.env"})
const port = process.env.PORT || 3000
const version = process.env.VERSION || "v1"
const db = require("./utils/db")

const bparser = require('body-parser')

const cors = require("cors")
app.use(cors({
    origin: "*",
    credentials: true
}))


const api_route = require("./routes/api")

app.use(bparser.json());
app.use(bparser.urlencoded({extended:true}));

app.use(`/api/${version}`, api_route)

const server = app.listen(port, (err) => {
    if(!err){
        console.log(`app is running on http://localhost:${port}/api/${version}`)
    }
})