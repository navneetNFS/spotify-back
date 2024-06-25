const mongoose = require("mongoose")
const validator = require('validator')
const jwt = require("jsonwebtoken")


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
    },
    liked_songs: {
        type: Array,
        default: []
    },
    liked_playlist: {
        type: Array,
        default: []
    },
    created_playlist: {
        type: Array,
        default: []
    },
    subscribed_artist: {
        type: Array,
        default: []
    }
})

userSchema.pre("save", async function(next){
    return this.password = Buffer.from(this.password).toString('base64')
})

userSchema.methods.getJWTTokken = function(){
    return jwt.sign({id:this._id},process.env.JWT_TOKKEN)
}

userSchema.methods.confirmPassword = async function(enteredPassword){
    return Buffer.from(this.password, 'base64').toString('ascii') == enteredPassword ? true : false
}

module.exports = mongoose.model('Users',userSchema)