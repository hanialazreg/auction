const mongoose = require("mongoose");
const UserDataBase = require("../Database/User");
const bcrypt = require("bcryptjs");
const User = mongoose.model("user");
const auth = require("./middleware/auth");

module.exports = (app) => {
  app.post("/api/signup", (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, data) => {
      if (err) return res.status(404).send(err);
      if (data) {
        return res.status(404).json("email is already in use");
      }
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.status(404).send(err);
        req.body.password = hash;

        var user = new User(req.body);

        user.save((err) => {
          if (err) return res.status(404).json(err);
          UserDataBase.generateAuthToken(user, (token) =>
            res.status(200).send(`user created ${(user, token)}`)
          );
        });
      });
    });
  });

  app.post("/api/logIn", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        console.log("err in api/login", err);
        return res.status(505).send("problem with the server wait");
      }
      if (!user) {
        return res.status(404).send("user does not exists");
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((comparisonRes) => {
          if (!comparisonRes) {
            return res.status(404).send("please check your credentials");
          }
          UserDataBase.generateAuthToken(user, (user, token) =>
            res.status(200).send({ user, token })
          );
        })
        .catch((err) => err);
    });
  });

  app.post("/api/me", auth, (req, res) => {
    // View logged in user profile
    res.send(req.user);
  });

  app.post("/api/signOut", (req, res) => {
    User.findOne({ name: req.body.userName }, (err, data) => {
      if (err) res.json(err);
      data.token = [];
      data.save((err) => {
        if (err) res.json(err);
        res.status(201).json({ deleted: "success" });
      });
    });
  });
};
