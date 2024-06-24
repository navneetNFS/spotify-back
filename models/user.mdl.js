const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require('bcryptjs');


const Schema = mongoose.Schema;

const userSchema  = new Schema({
    email: {
        type: String,
        require: [true,"Enter your email address"],
        unique: [true, "Email already available!"],
        validate : [validator.isEmail,"Please enter a valid email address"]
    },
    password: {
        type: String,
        require: [true,"Enter your password"],
        minLength: [8,"Please enter minimum 8 character password"],
        maxLength: [15,"Please enter maximum 10 character password"]
    },
    name: {
        type: String,
        require: [true,"Enter your name"],
    },
    dob: {
        type: Date,
        require: [true,"Enter your date of birth"],
    },
    avatar: {
        type: String,
        default: '',
    },
    role: {
        type: String,
        default: 'user',
    },
    verifyed: {
        type: Boolean,
        default: false
    }
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

module.exports = mongoose.model('Users',userSchema)