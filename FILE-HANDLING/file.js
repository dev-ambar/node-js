const fs = require("fs");

// FS write method to createa file syncronusly 
//fs.writeFileSync("./test.txt","Hello this file is created by node fs module syncronusly ");

// FS write method to createa file Asyncronusly 
//fs.writeFile("./test.txt","Hello this file is created by node fs module asyncronusly",(err)=>{console.log(err)});


// read a file syncronusly 

   //const res = fs.readFileSync("./contact.text","utf-8");

   //console.log(res);

   // read a file Asyncronusly 
  /*  fs.readFile("./contact.text","utf-8",(err,data) =>{

    if(err)
     {
        console.log("there is some error to read a file",err.message)
     }
     else
     {
        console.log(data);
     }

   }); */

   // file statistic 

   //const stat = fs.statSync("./test.txt");
   //console.log(stat.isFile());

   //console.log(fs.statSync("./test.txt").isFile())

   // how to delete a file 

   //fs.unlinkSync("./contact.text");

   // create directory using fs

   //fs.mkdirSync("./a/b/c",{recursive:true});
   
   fs.copyFileSync("./test.txt","./a/b/bcopy.text");