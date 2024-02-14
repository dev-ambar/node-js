
const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;


// define midleware to handle the form data in body in post requset from postman.

app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>
{  
   console.log("I am from midale ware 1");
   next();
});

app.use((req,res,next)=>
{  
   console.log("I am from midale ware 2");
   next();
});

app.use((req,res,next)=>
{  
     fs.appendFileSync("log.txt",`\n ${Date.now()}::${req.method}::${req.path}`)
     next();
});

// get the all users records for bowser spescfic
app.get("/users",(req,res) =>{
     const html = `
     <ul>
        ${users.map((user)=> `<li>${user.first_name}</li>`).join("")}
     </ul>`;
    
    res.send(html);
});

// get the all users records for another than browser a json formate spescfic
app.get("/api/users",(req,res) =>{
    res.json(users);
});

// to get a  user based on id
app.get("/api/users/:id",(req,res) => {
      const id = req.params.id;
      const findUser = users.find((user)=> user.id == id);
      res.json(findUser);
});

/// to add new user data in list .

app.post("/api/users",(req,res)=>{

     const  nextId = users.length + 1;
     const newUser = req.body;
     users.push({...newUser,id: nextId});
     fs.writeFile("./MOCK_DATA.json",  JSON.stringify (users) ,(err,data)=>{if(err)console.log("something happenin time of create new user")})
     res.send(`user succesfully created with id ${nextId}`);
});

/* to update existing user data in  in list like you want to update partial data like a specsfic field or fields 
     here we are using patch 
*/

app.patch("/api/users/:id",(req,res) =>{

    const reqId = req.params.id;
    const reqValue = req.body;
    const findUser = users.find((user)=> user.id == reqId);

    if(findUser)
    {   
         if(reqValue.first_name!= undefined)
            findUser.first_name = reqValue.first_name;
         if(reqValue.last_name!= undefined)
            findUser.last_name = reqValue.last_name;
         if(reqValue.email!= undefined)
            findUser.email = reqValue.email;
         if(reqValue.gender!= undefined)
            findUser.gender = reqValue.gender;
        if(reqValue.address!= undefined)
            findUser.address = reqValue.address; 
        
           fs.readFile("./MOCK_DATA.json", 'utf8', (err, data) => {
            if (err) {
              console.error('Error reading JSON file:', err);
              return res.status(500).json({ error: 'Internal Server Error' });
            }
        
                const jsonData = JSON.parse(data); 
                Object.assign(jsonData,findUser); 

                // Write back to the JSON file
                fs.writeFile("./MOCK_DATA.json", JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                if (err) {
                console.error('Error writing to JSON file:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
                }
        
                return res.status(201).json({ Success: 'User detail has been update' });
               });        

           });

     } 
     else
     return res.status(404).json({ error: 'user not found to update' });

});

app.listen(PORT,() =>{console.log(`Server is starting on port: ${PORT}`)});

