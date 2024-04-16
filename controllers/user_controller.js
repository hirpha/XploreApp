const asyncHandler = require('express-async-handler')

/////////////////////////////////////////////////////

const nodemailer = require("nodemailer");


const jwt = require('jsonwebtoken')
const {User} = require('../models');

const register = asyncHandler(async (req, res) => {
console.log(req.body)
    const { name, password, email } = req.body

    const user =await User.createAccount({
        name: name,
        email: email,
        password: password
      })


       console.log(user)
        if(user){

            res.send(user)

    } else {
        res.status(404)
        throw new Error("Something went wrong")
    }

})
const getUser = asyncHandler(async (req, res) => {
console.log("waiting")
  const user =  await User.findAll()
  if(user){
    res.send(user)
  } else{
    res.send({
        "status":false,
        "message":"user note found"
    })
  }

})


module.exports = {
    register,
    getUser
}