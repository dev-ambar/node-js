const express = require("express");
const app = express();
const PORT = 8001;

const urlRouter = require("./router/url");
const {getDbConnection} = require("./dbConfig");



//connect to mongo data base 
getDbConnection("mongodb://127.0.0.1:27017/short-url");

urlRouter.route("/url",urlRouter);


app.use(express.json);
app.listen(PORT,()=>{console.log(`Server is started  at port : ${PORT}`)});