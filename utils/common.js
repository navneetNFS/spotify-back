module.exports.ErrorHandler = (status_code,message,res) => {
    return res.status(status_code).json({success:false,message})
}