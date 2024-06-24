const User = require('../models/user.mdl')


module.exports.createUser = async (req,res,next) => {
    const data = req.body
    const obj_user = new User(data);
    try{
        const resp = await obj_user.save()
        if(resp){
            console.log(resp);
            res.send("response sended")
        }
    }
    catch (err){
        console.log(err);
    }
}