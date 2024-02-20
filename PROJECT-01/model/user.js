const mongoose= require("mongoose");
const { timeStamp } = require("console");

// create schema & model in mongoDB using mangooes

const userSchema = new mongoose.Schema({

   first_name:{
      type: String,
      require: true,
   },
   last_name:{
      type: String,
   },
   email:{
      type:String,
      unique: true,
      require: true,
   },
   gender:{
      type: String,
   },
   address:{
      type: String,
   }
},{timestamps: true});

// createing model
const User = mongoose.model("user",userSchema);

module.exports = User;