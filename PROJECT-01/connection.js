const mongoose= require("mongoose");

 async function getDbConnection(url)
 {
     return mongoose.connect(url)
    .then(()=> console.log("Data base connection conected successfully"))
    .catch((err)=> console.log("conection failed",err));
 }

 module.exports = {
    getDbConnection,
 };