const express = require("express");
const app = express();
const PORT = 8001;

const path = require("path");

const urlRouter = require("./router/url");
const staticRouter = require("./router/staticRouter");
const {getDbConnection} = require("./dbConfig");



app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


//connect to mongo data base 
getDbConnection("mongodb://127.0.0.1:27017/short-url");


//use midleware pugin 
app.use(express.json());

// redirect request to Api router
app.use("/url",urlRouter);

app.use("/info",staticRouter);


app.listen(PORT,()=>{console.log(`Server is started  at port : ${PORT}`)});