const express = require("express");
const router = express.Router();
const {handllerGetUsers,
    handllerGetUserById,
    handllerCreateUser,
    handllerUpdateUser,
    handllerDeleteUser
   } = require("../controler/user");


  router.route("/")
 .get(handllerGetUsers)
 .post(handllerCreateUser);

 router.route("/:id")
.get(handllerGetUserById)
.patch(handllerUpdateUser)
.delete(handllerDeleteUser);


module.exports = router;