const mongoose = require("mongoose");
const Category = require("../Database/Category ");
module.exports = (app) => {
  ///
  const addCat = (req, res) => {
    Category.createCategory(req.body, (err, data) => {
      if (err) {
        res.status(404).send(err);
        console.log("duplicate key");
      } else {
        res.status(200).send(data);
      }
    });
  };

  const deleteCat = (req, res) => {
    Category.deleteCategory(req.body.name, (err, result) => {
      if (result) {
        res.status(200).send("true");
      } else {
        res.status(404).send("false");
      }
    });
  };
  const getProductByCat = (req, res) => {
    console.log(req.query.category);
    Category.getAllProductByCategory(req.query.category, (err, data) => {
      if (err) {
        res.status(401).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  };

  const getAllCat = (req, res) => {
    Category.getAll((err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
        res.end();
      }
    });
  };

  ///

  app.post("/api/AddCategory", addCat);

  app.delete("/api/deleteCategory", deleteCat);

  app.get("/api/getProducts", getProductByCat);

  app.get("/api/categories", getAllCat);
};
