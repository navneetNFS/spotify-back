const mongoose = require("mongoose")
const uri = process.env.DATABASE

const connect_db = async () => {
    return mongoose.connect(uri).then((result) => {
        console.log(`Connect Successfull`);
        console.log(result.connection.host);
        return result
      })
      .catch((err) => {
        console.log(err);
        console.log("connection failed");
      });
} 


module.exports = connect_db()