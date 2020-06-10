const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const productSchema = new Schema({
  name: { type: String, required: true },
  descreption: { type: String },
  image: {
    type: String,
    required: true,
    validate: (value) => {
      if (!validator.isURL(value)) {
        throw new Error({ error: "Invalid URL address" });
      }
    },
  },
  category: [{ type: Schema.Types.ObjectId, ref: "Categorie" }],
  last_auction_price: { type: Number, default: "0" },
  value: { type: Number },
  initial_date: { type: Date },
  end_date: { type: Date },
  participants: [
    {
      user: { type: Schema.Types.ObjectId, ref: "user" },
      price: { type: Number },
      date: { type: Date },
    },
  ],
  // add imgs schema
  images: [],
});
productSchema.index({ descreption: "text" });

var Product = mongoose.model("Product", productSchema);
// { initial_date: { $lte: new Date() }, end_date: { $gte: new Date() } }
// { initial_date: { $lte: new Date() } }
var getAll = function (callback) {
  Product.find(
    { initial_date: { $lte: new Date() }, end_date: { $gte: new Date() } },

    (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    }
  );
};
///// waiting front to test
var getByCategory = function (cat, callback) {
  Product.find({ category: cat }).exec((err, product) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, product);
    }
  });
};

///
var getOne = function (id, callback) {
  Product.findById(id)
    .populate("participants.user")
    // .populate("winner")
    .exec((err, product) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, product);
      }
    });
};

var searchFilter = function (descriptionfilter, callback) {
  // Product.find({$text: {$search: searchString}})
  // "$text": {"$search": req.body.query}
  // {$text: {$search: descriptionfilter}}
  Product.find(
    {
      $text: { $search: descriptionfilter },
      initial_date: { $lte: new Date() },
      end_date: { $gte: new Date() },
    },
    (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    }
  );
};

// var updateWinner = function (idProduct, callback) {
//   Product.findOneAndUpdate({ _id: idProduct }).populate('participants.user').exec(
//     (err, product) => {
//       if (err) { callback(err, null) }
//       else {
//         callback(null, product)
//       }
//     });
// }

var findWinner = function (idProduct, callback) {
  Product.find({ _id: idProduct })
    .populate("participants.user")
    .exec((err, product) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, product);
      }
    });
};
// number of auctions
var findParticipantAuction = function (userid, callback) {
  var nbauction = 0;
  Product.find({ _id: userid })
    .populate("participants.user")
    .exec((err, product) => {
      if (err) {
        callback(err, null);
      } else {
        // nbauction++;
        callback(null, product);
      }
    });
};

var completedPro = function (callback) {
  Product.find({ end_date: { $lte: new Date() } }, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};
module.exports.getAll = getAll;
module.exports.getOne = getOne;
module.exports.searchFilter = searchFilter;
module.exports.findWinner = findWinner;
module.exports.completedPro = completedPro;
module.exports.getByCategory = getByCategory;
module.exports.findParticipantAuction = findParticipantAuction;
