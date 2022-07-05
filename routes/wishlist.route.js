const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
router.use(express.json());
const { extend } = require('lodash');
const { checkifexistsinarray } = require('../functions/checkifexistsinarray');
const { removeelemntfromarray } = require('../functions/removeelemntfromarray');
const { authhandler } = require("../middlewares/authhandler");
const { Wishlist } = require('../models/wishlist.model');
const { addtoarray } = require('../functions/addtoarray');


router.route('/routechecker')
.get(async (req, res) => {
    res.json({ success : true, route:"whishlist-route"});
  })
.post((req, res)=>{
  const postbody = req.body;
  res.json({success : true, route:"whishlist-route" ,reqtype:"post", data:postbody});
});

router.use(authhandler);
router.route('/getwhishlistdata')
  .get(async (req, res) => {
    const data = await Wishlist.findOne({ mobile: req.userval.mobile });
    res.json({ success: true, data });
  });

router.route('/addtowhishlist')
.post(async ( req, res ) => {
  try{
  const data = req.body;
  const wishlistdata = await Wishlist.findOne({ mobile: req.userval.mobile });
  console.log({ wishlistdata });
  const checkifexists = checkifexistsinarray(wishlistdata.productsinwishlist, data);
  if(checkifexists){
    return res.status(400).json({ success: true, message: "already present in array" });
  }
  if(!checkifexists){
  const newarray = [...wishlistdata.productsinwishlist, data];
  const update = extend(wishlistdata, {productsinwishlist: newarray} );
  await Wishlist.findByIdAndUpdate(update._id, update);
  return res.json({ success: true, update });
  }
  }
  catch( error ){
    console.error(error);
    res.status(500).json({ success: false, errormessage:error.message });
  }
   
});

router.route('/removefromwhishlist')
.post(async ( req, res ) => {
  try {
    

  const data = req.body;
  const wishlistdata = await Wishlist.findOne({ mobile: req.userval.mobile });
  const whishlistarray = [...wishlistdata.productsinwishlist];
  const checkifexists = checkifexistsinarray(whishlistarray, data);
  
  if(checkifexists){
    const filteredarray = removeelemntfromarray(whishlistarray, data);

   const removefromwhishlistupdate = extend(wishlistdata, {productsinwishlist: filteredarray});
   await Wishlist.findByIdAndUpdate(removefromwhishlistupdate._id, removefromwhishlistupdate);
   return res.json({ success: true, removefromwhishlistupdate });
   }
   if(!checkifexists){
     return res.json({ success: false, message:"product doesn't exist in whishlist" });
   }
} catch (error) {
  console.error(error);
  res.status(500).json({ success: false, errormessage:error.message });

}


});

module.exports = router;