const http = require("http");
const fs = require("fs");
const url = require("url");


const server = http.createServer((req,res) =>{  
    // ignore the /favicon.ico request 
    if(req.url==='/favicon.ico')
        return res.end();
    const myUrl = url.parse(req.url,true);
    // create a log pettron  when any new request comes it shoud be log in log file  
      const log = `${Date.now()}: url: ${req.url}: request has recieved \n`;
      // now call fs filesystem  for  create a log file and append the log in each time
     fs.appendFile('log.txt',log,(err,data)=>{
        switch(myUrl.pathname)
        {
         case '/' :  res.end("Welcome to My Home Page");
         break;
         case '/contactus': res.end("ambar.gtm@gmail.com");
         break;
         case '/about':
            // extract Queries parameter
            const usrname = myUrl.query.username;
        
             res.end(`My name is ${usrname},I am a meanstack developer`);
         break;
         default : res.end("resource not found ")
        }
        
     });
      

});
server.listen(8000,()=>{
    console.log("--------------->web server has  started<------------------");
});




