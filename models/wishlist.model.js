const mongoose = require('mongoose');
const { Schema } = mongoose;

const Prodinwishlistschema = new Schema({
  pid: Number,
  name: String,
  image: String,
  price: Number,
  description: String,
  foodtype: String,
  chilli: Number,
  stars: Number,
  dishtype: String,
  newdish: Boolean,
  timed: Boolean,
  prid: String
  });

const Wishlistschema = new Schema({
  mobile : Number,
  productsinwishlist : [ Prodinwishlistschema ] 
  },
  {
     timestamps : true
  }
  );

const Wishlist = mongoose.model('Wishlistdatalist', Wishlistschema);

module.exports = { Wishlist };