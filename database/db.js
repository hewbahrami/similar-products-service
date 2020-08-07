const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/similar-products', {useNewUrlParser: true});

const db = mongoose.connection;

const similarProductsSchema = mongoose.Schema({
  // id: {
  //   type: Number,
  //   unique: true
  // },
  name: String,
  description: String,
  price: Number,
  photo1: String,
  photo2: String
});

const SimilarProducts = mongoose.model('SimilarProducts', similarProductsSchema);

module.exports = {
  connect: db,
  SimilarProducts: SimilarProducts
};