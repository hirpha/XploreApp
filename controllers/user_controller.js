const asyncHandler = require('express-async-handler')

/////////////////////////////////////////////////////

const nodemailer = require("nodemailer");


const jwt = require('jsonwebtoken')
const User = require('../models/User');

const register = asyncHandler(async (req, res) => {

    const { name, password, email } = req.body

    const user = User.create({
        name: name,
        email: email,
        password: password
      })

        res.send(user)
        if(user){

            res.send(user)

    } else {
        res.status(404)
        throw new Error("Something went wrong")
    }

})


module.exports = {
    register
}