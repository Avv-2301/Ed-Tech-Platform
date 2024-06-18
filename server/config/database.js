const mongoose = require("mongoose")
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connection Successfull"))
    .catch((error) =>{
        console.log("DB Connection Failed")
        console.error(error)
        process.exit(1);
    })
}