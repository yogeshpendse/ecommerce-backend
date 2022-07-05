const { User } = require('../models/user.model');
const { Cart } = require('../models/cart.model');
const { Wishlist } = require('../models/wishlist.model');

async function addtousercollection ( username, hashedpassword, mobileno, name ) {
  try {
    const Newuser = new User({ username, password:hashedpassword, mobile : mobileno, name });
    await Newuser.save();
    return true
  } catch (error) {
    console.log(error);
    const errorvar = `error occured while creating doc for ${username} in userdatalists.`;
    return res.status(500).json({ success: false, errormessage: error.message });
  }
}
async function addtocartcollection (username, mobileno) {
  try {
    const Newcart = new Cart({ mobile : mobileno, productsincart: [] });
    await Newcart.save();
    return true
  } catch (error) {
    console.log(error);
    const errorvar = `error occured while creating doc for ${username} in cartdatalists.`;
    console.log(errorvar);
    return res.status(500).json({ success: false, errormessage: error.message });
  }
}
async function addtowishlistcollection (username, mobileno) {
  try {
    const Newwishlist = new Wishlist({ mobile : mobileno, productsinwishlist: [] });
    await Newwishlist.save();
    return true
  } catch (error) {
    console.log(error);
    const errorvar = `error occured while creating doc for ${username} in wishlistdatalists.`;
    console.log(errorvar);
    return res.status(500).json({ success: false, errormessage: error.message });
  }
}


module.exports = { addtousercollection, addtocartcollection, addtowishlistcollection };