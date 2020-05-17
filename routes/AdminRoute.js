// create the functions
const authAdmin = require("./middleware/authAdmin.js");
const mongoose = require("mongoose");
const UserDataBase = require("../Database/User.js");
const bcrypt = require("bcryptjs");
const User = mongoose.model("user");

// authAdmin,

module.exports = (app) => {
  app.post("/api/checkAdmin", authAdmin, (req, res) => {
    // console.log(req.body);
    res.status(201).json(req.body);
  });
};
