const mongoose = require("mongoose");
// const Product = require("./Product");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, unique: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Category = mongoose.model("Category", categorySchema);

var createCategory = function (categoryData, callback) {
  var cat = new Category(categoryData);
  cat.save((err, data) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

var updateProductCategory = function (idCategory, idProduct, callback) {
  Category.findOneAndUpdate(
    { _id: idCategory },
    { $addToSet: { products: idProduct } },
    { new: true }
  )
    .then((doc) => {
      callback(doc);
    })
    .catch((err) => {
      callback(err);
    });
};

var deleteCategory = function (nameCategory, callback) {
  Category.deleteOne({ name: nameCategory }, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

var getAllProductByCategory = function (categoryName, callback) {
  Category.find({ name: categoryName })
    .populate({
      path: "products",
      match: {
        initial_date: { $lte: new Date() },
        end_date: { $gte: new Date() },
      },
    })
    .exec((err, category) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, category);
      }
    });
};

var getAll = function (callback) {
  Category.find({}, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};
module.exports.updateProductCategory = updateProductCategory;
module.exports.deleteCategory = deleteCategory;
module.exports.createCategory = createCategory;
module.exports.getAllProductByCategory = getAllProductByCategory;
module.exports.getAll = getAll;
