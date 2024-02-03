
const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;


// define midleware to handle the form data in body in post requset from postman.

app.use(express.urlencoded({extended:false}));

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

// to update existing data in list


app.patch("/app/users/:id",(req,res) =>{

    const id = req.params.id;
    const updatedValue = req.body;
    const findUser = users.find((user)=> user.id == id);
    if(findUser)
    {
        users.at(findUser.id).first_name = updatedValue.first_name;
        fs.writeFile("./MOCK_DATA.json",  JSON.stringify (users) ,(err,data)=>{if(err)console.log("something happenin time of create new user")})

        res.send("user succesfully updated with ", users.at(findUser.id));
    }
});

app.listen(PORT,() =>{console.log(`Server is starting on port: ${PORT}`)});

