const shortid = require('shortid');
const URL = require("../model/url");

async function handleGenerateNewShortUrl(req,res)
{
   const shortId = shortid.generate();
   const redirectUrl = req.body;
   if(!redirectUrl)
      return res.status(400).json({error:"Url is require"});

   await URL.create({
     shortId: shortId,
     redirectURL:redirectUrl,
     visitedHistory:[],
   });

   return res.status(201).json({message: `Short url is created with id : ${shortId}`});
}

module.exports = {handleGenerateNewShortUrl,};