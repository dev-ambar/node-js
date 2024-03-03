const express = require("express");
const router = express.Router();

const {handleGenerateNewShortUrl,handleRedirectToOrignalUrl,handleAnalyticalData} = require("../controller/url");



// to create a short url 
router.post("/",  handleGenerateNewShortUrl);

// fetch the  orignal url base on shortId

router.get("/:shortId",  handleRedirectToOrignalUrl);

// fetch the  analytical for  url base on shortId

router.get("/analytics/:shortId",  handleAnalyticalData);


module.exports = router;