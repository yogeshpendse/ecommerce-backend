const mongoose = require('mongoose');
const { Schema } = mongoose;

const Productschema = new Schema({
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
  },
  {
     timestamps : true
  }
  );

const Product = mongoose.model('Productdatalist', Productschema);

module.exports = { Product };