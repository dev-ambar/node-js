const userRouter = require("./router/user");
const {getDbConnection} = require("./connection");
const PORT = 8000;
const express = require("express");
const app = express();
const {logReqRes} = require("./middleware");


// midleware plugin to handle the form data in body in post requset from postman.

app.use(express.urlencoded({extended:false}));

//connect to mongo data base 
getDbConnection("mongodb://127.0.0.1:27017/mydatabase");

app.use(logReqRes("log.txt"));

app.use("/api/users",userRouter);

app.listen(PORT,() =>{console.log(`Server is starting on port: ${PORT}`)});

