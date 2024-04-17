const asyncHandler = require("express-async-handler");

/////////////////////////////////////////////////////

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { generateAuthToken } = require("../utils/generate_token");

const register = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, password, email, phone_number } = req.body;

  const user = await User.create({
    name: name,
    email: email,
    password: password,
    phone_number: phone_number,
  });

  console.log(user);
  if (user) {
    res.status(201).send({
      message: "create user success",
      data: user,
    });
  } else {
    res.status(404);
    res.send({
      status: false,
      message: "Something went wrong",
    });
  }
});
const getUser = asyncHandler(async (req, res) => {
  console.log("waiting");
  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
  });
  if (user) {
    res.status(200);
    res.send({
      message: "user",
      data: user,
    });
  } else {
    res.send({
      status: false,
      message: "user note found",
    });
  }
});
const getUsers = asyncHandler(async (req, res) => {
  console.log("waiting");
  const user = await User.findAll();
  if (user) {
    res.status(200);
    res.send({
      message: "users",
      data: user,
    });
  } else {
    res.send({
      status: false,
      message: "user note found",
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { phone_number, password } = req.body;
  const user = await User.findOne({ where: { phone_number: phone_number } });

  console.log(user);
  if (user) {
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        res.status(404);
        res.send({
          message: "Invalid Credentials",
        });
      } else if (isMatch) {
        res.send({
          message: "Login success",
          data: user,
          token: generateAuthToken(user.id),
        });
      } else {
        res.status(404);
        res.send({
          message: "Invalid Credentials",
        });
      }
    });
  } else {
    res.status(404);
    res.send({
      message: "Invalid Credentials",
    });
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { old_password, new_password } = req.body;

  const user = await req.user;
  console.log(user.password);

  user.comparePassword(old_password, async (err, isMatch) => {
    if (err) {
      res.status(404);
      res.send({
        message: "Invalid old password",
      });
    } else if (isMatch) {
      user.password = new_password;
      console.log(user);
      const updatedUser = await user.save();
      res.status(201);
      res.send({
        messgae: "change password success",
        data: updatedUser,
      });
    } else {
      res.status(404);
      res.send({
        message: "Invalid old password",
      });
    }
  });
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { confirm_password, new_password } = req.body;
  console.log("-----------------------------------------");
  const user = req.user;
  console.log(user.password);
  if (confirm_password !== new_password) {
    res.status(404);
    res.send({
      message: "password doesn't matchr",
    });
  } else {
    user.password = new_password;
    console.log(user);
    const updatedUser = await user.save();
    res.status(201);
    res.send({
      message: "forget password success",
      data: updatedUser,
    });
  }
});

module.exports = {
  register,
  getUser,
  loginUser,
  changePassword,
  forgetPassword,
  getUsers,
};
