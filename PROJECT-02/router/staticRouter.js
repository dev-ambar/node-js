const express = require("express");
const staticRouter = express.Router();
const {handleGetallshortids} = require("../controller/url");


staticRouter.get("/",handleGetallshortids);


module.exports = staticRouter;