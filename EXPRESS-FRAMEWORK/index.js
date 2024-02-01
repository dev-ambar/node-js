const express = require("express");
const  PORT = 8000;


// to createa app to hold the capibility of express.
const app = express();

// create get request 

app.get("/",(req,res) =>{
res.send("Welcome this is home Page !")});

app.get("/about",(req,res) =>{
    res.send(`My name is ${req.query.username},I am a meanstack developer`)});

app.get("/contact-us",(req,res) =>{
        res.send("Email id:ambar.gtm@gmail.com./n Mobile:919911036304")});

app.listen(PORT,() =>{ console.log(`----->server is starting in ${PORT}----->`)});



