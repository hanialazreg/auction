const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const userDataBase = require("../../Database/User");

const authAdmin = (req, res, next) => {
  //compare the user's (from the data base) admin token to ours
  const id = req.body.id;

  req.body = {};

  if (!id) {
    return res.status(401).json({ auth: "denied", reason: "no id " });
  }

  userDataBase.findUserByID(id, (err, admin) => {
    if (err) {
      return res.status(401).json({ auth: "denied", reason: err });
    }

    if (!admin) {
      return res.status(401).json({ auth: "denied", reason: "not found" });
    }

    admin = JSON.parse(JSON.stringify(admin));

    if (!admin.isAdmin) {
      return res.status(401).json({ auth: "denied", reason: "not an admin" });
    }

    require("dotenv").config();
    bcrypt.compare(
      process.env.ADMIN_PASS,
      admin.adminPass,
      (err, comparisionRES) => {
        if (err) {
          return res.status(401).json({ auth: "denied", reason: err });
        }
        if (!comparisionRES) {
          return res.status(401).json({ auth: "denied", reason: "wrong pass" });
        }

        req.body = { auth: "autherized" };
        next();
      }
    );
  });
};
module.exports = authAdmin;
