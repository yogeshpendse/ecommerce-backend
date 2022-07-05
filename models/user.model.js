
// const Userschema = new Schema({
//   username: {
//     type: String,
//     min:[3, "Min should 3"],
//     max:[8, "Max can be 9"],
//     required: [true, 'username is required'],
//     unique: true
//     },
//   password: {
//     type: String,
//     min:[8, "Min should 3"],
//     required: [true, 'password is required'],
//     },
//   mobile : {
//     type: Number,
//     min:[10, "Min should be 10"],
//     unique: true
//     },
//   name: {
//     type: String,
//   },    
//   },
//   {
//      timestamps : true
//   }
//   );

const mongoose = require('mongoose');
const { Schema } = mongoose;

// const Userschema = new Schema({
//   username: String,
//   password: String,
//   mobile : Number,
//   name: String,    
//   },
//   {
//      timestamps : true
//   }
//   );
const Userschema = new Schema({
  username: {
    type: String,
    min:[3, "Min should 3"],
    max:[8, "Max can be 9"],
    required: [true, 'username is required'],
    unique:true
    },
  password: {
    type: String,
    min:[8, "Min should 3"],
    required: [true, 'password is required'],
    },
  mobile : {
    type: Number,
    // min:[10, "Min should be 10"],
    unique:true
    },
  name: {
    type: String,
  },    
  },
  {
     timestamps : true
  }
  )
const User = mongoose.model('Userdatalist', Userschema);

module.exports = { User };