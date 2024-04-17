const asyncHandler = require("express-async-handler");

/////////////////////////////////////////////////////

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { generateAuthToken } = require("../utils/generate_token");

const register = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, password, email ,phone_number} = req.body;

  const user = await User.create({
    name: name,
    email: email,
    password: password,
    phone_number:phone_number
  });

  console.log(user);
  if (user) {
    res.status(201).send({
      "message":"success",
      "user":user
    });
  } else {
    res.status(404);
    throw new Error("Something went wrong");
  }
});
const getUser = asyncHandler(async (req, res) => {
  console.log("waiting");
  const user = await User.findAll();
  if (user) {
    res.send(user);
  } else {
    res.send({
      status: false,
      message: "user note found",
    });
  }
});


const loginUser = asyncHandler(async (req, res) => {
  const { phone_number, password } = req.body
  const user = await User.findOne({ where: { phone_number: phone_number } })

  console.log(user)
  if (user ) {
    
    user.comparePassword(password, (err, isMatch) => {

      if (err) {
        res.status(404)
      throw new Error("Invalid Credentials")
      } else if (isMatch) {
        res.send({
        "user":user,
        token: generateAuthToken(user.id),

      })
      } else {
      res.status(404)
      throw new Error("Invalid Credentials")
      }
     
    });


    
      

  } else {
      res.status(404)
      throw new Error("Invalid Credentials")
  }

})

const changePassword = asyncHandler(async (req, res) => {
  const {old_password, new_password } = req.body;

  const user = await req.user;



    
  console.log(user)
   const tt=     await user.changePassword(old_password, new_password);
        res.send({
          message: "Password changed successfully",
        });
    


  

  
  
});

module.exports = {
  register,
  getUser,
  loginUser,
  changePassword
};
