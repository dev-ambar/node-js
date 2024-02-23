const express = require("express");
const router = express.Router();
const {handleGenerateNewShortUrl,} = require("../controller/url");



router.post("/",  handleGenerateNewShortUrl);


module.exports = router;