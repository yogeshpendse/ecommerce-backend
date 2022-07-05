const mongoose = require('mongoose');
const { Schema } = mongoose;

const Prodincartschema = new Schema({
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
  prid: String,
  quantity: Number
  });

const Cartschema = new Schema({
  mobile : Number,
  productsincart : [ Prodincartschema ] 
  },
  {
     timestamps : true
  }
  );

const Cart = mongoose.model('Cartdatalist', Cartschema);

module.exports = { Cart };