const shortid = require('shortid');
const URL = require("../model/url");

async function handleGenerateNewShortUrl(req,res)
{
   const shortId = shortid.generate();
   const reqBody = req.body;
   if(!reqBody.url)
      return res.status(400).json({error:"Url is require"});

    // to create new short url in mongo db useing URL Model
   await URL.create({
     shortId: shortId,
     redirectURL:reqBody.url,
     visitedHistory:[],
   });

   return res.status(201).json({message: `Short url is created with id : ${shortId}`});
}

async function handleRedirectToOrignalUrl(req,res)
{
   const shortId = req.params.shortId;
   if(!shortId)
     return res.status(400).json({error:"shortId is require"});
   const entry =  await URL.findOneAndUpdate({
      shortId
   },
    {
      $push:{
         visitedHistory:{
            timestamp:Date.now(),
         },
      },
    }
   ).catch((err)=>console.log('there are some error to find the redirect url in db '));

   if(!entry)
   return res.status(404).json({error:`no data found in db for this short id ${shortId}`});
   else  res.redirect(entry.redirectURL);
}

async function handleAnalyticalData(req,res)
{
   const shortId = req.params.shortId;
   if(!shortId)
   return res.status(400).json({error:"shortId is require for analytical data"});
   
   const result =  await URL.findOne({shortId});

   if(!result)
   return res.status(404).json({error:`no data found in db for this short id ${shortId}`});

   return  res.status(200).json({
      totalClicks : result.visitedHistory.length,
      analytics: result.visitedHistory,
   });


}

module.exports = {handleGenerateNewShortUrl,handleRedirectToOrignalUrl,handleAnalyticalData,};