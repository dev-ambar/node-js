const User = require("../model/user");

async function handllerGetUsers(req,res)
{
     const allDbUsers = await User.find({});
     return res.json(allDbUsers);
} 

async function handllerGetUserById(req,res)
{
    const id = req.params.id;
    const find_user = await User.findById(id)
    if(!find_user) return res.status(404).json({mesaage:`user not found to coressponding id ${id}`});
    else
     return res.status(200).json(find_user);
}

async function handllerCreateUser(req,res)
{
    const newUser = req.body;
    const userCreated =   await User.create({
     first_name:newUser.first_name,
     last_name:newUser.last_name,
     email:newUser.email,
     address:newUser.address,
     gender:newUser.gender,
    });
    console.log(" new user-->",userCreated);

    res.status(201).json({mesaage:`user succesfully created`});
}
async function handllerUpdateUser(req,res)
{
    const reqValue = req.body;
    const temp  = User.findById(req.params.id);
      if(reqValue.first_name!= undefined)
           temp.first_name = reqValue.first_name;
      if(reqValue.last_name!= undefined)
           temp.last_name = reqValue.last_name;
      if(reqValue.email!= undefined)
           temp.email = reqValue.email;
      if(reqValue.gender!= undefined)
           temp.gender = reqValue.gender;
     if(reqValue.address!= undefined)
           temp.address = reqValue.address;

     await User.updateOne(temp);
     
  
     return res.status(201).json({mesaage:`user has been updated to coressponding id ${req.params.id}`});
}

async function handllerDeleteUser(req,res)
{
    await User.findByIdAndDelete(req.params.id)
    return res.status(201).json({status: "Deleted"});
}


module.exports = {
    handllerGetUsers,handllerGetUserById,handllerCreateUser,handllerUpdateUser,handllerDeleteUser,
};