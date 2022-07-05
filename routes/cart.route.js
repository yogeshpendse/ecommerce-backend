const express = require('express')
const { extend } = require('lodash');
const router = express.Router();
const cors = require('cors');
router.use(cors());
router.use(express.json());
const { checkifexistsinarray } = require('../functions/checkifexistsinarray');
const { Cart } = require('../models/cart.model');
const { authhandler } = require("../middlewares/authhandler");
const { removeelemntfromarray } = require("../functions/removeelemntfromarray");
const { incrementquantityinarray, decrementquantityinarray } = require("../functions/cartincanddec");

router.route('/routechecker')
  .get((req, res) => {
    res.json({ success: true, route: "cart-route" });
  });


router.use(authhandler);
router.route('/getcartdata')
  .get(async (req, res) => {
    const data = await Cart.findOne({ mobile: req.userval.mobile });
    res.json({ success: true, data });
  });

router.route('/addtocart')
  .post(async (req, res) => {
    const data = req.body;
    const cartdata = await Cart.findOne({ mobile: req.userval.mobile });
    const productsincart = [...cartdata.productsincart];
    const checkifproductexists = checkifexistsinarray(productsincart, data);
    if (checkifproductexists) {
      return res.status(400).json({ success: true, message: "product already present in cart" });
    }
    if (!checkifproductexists) {
      const newarrayofprodsincart = [...productsincart, {...data, quantity:1}];
      const newcartdocument = extend(cartdata, { productsincart: newarrayofprodsincart });
      await Cart.findByIdAndUpdate(newcartdocument._id, newcartdocument);
      return res.json({ success: true, updatedcart: newcartdocument.productsincart });
    }
  });


router.route('/removefromcart')
  .post(async (req, res) => {
    const data = req.body;
    const cartdata = await Cart.findOne({ mobile: req.userval.mobile });
    const productsincart = [...cartdata.productsincart];
    const checkifproductexists = checkifexistsinarray(productsincart, data);
    if (checkifproductexists) {
      const newproductsincart = removeelemntfromarray(productsincart, data);
      const idforremovefromcartupdate = cartdata._id;
      const removefromcartupdate = { _id: idforremovefromcartupdate, mobile: req.userval.mobile, productsincart: newproductsincart }
      try {
        await Cart.findByIdAndUpdate(idforremovefromcartupdate, removefromcartupdate);
        return res.json({ success: true, message: "cart has been updated", data: removefromcartupdate });
      } catch (error) {
        return res.status(500).json({ success: false, errormessage: error.message });
      }
    }
    if (!checkifproductexists) {
      return res.status(400).json({ success: false, message: "product doesn't exist" });
    }
  });

router.route('/incrementincart')
  .post(async (req, res) => {
    try {
      const data = req.body;
      const cartdata = await Cart.findOne({ mobile: req.userval.mobile });
      const productsincart = [...cartdata.productsincart];
      const checkifproductexists = checkifexistsinarray(productsincart, data);
      if (checkifproductexists) {
        const newproductsincart = await incrementquantityinarray(productsincart, data);
        const idforincrementincartupdate = cartdata._id;
        const incrementincartupdate = { _id: idforincrementincartupdate, mobile: req.userval.mobile, productsincart: newproductsincart };
        try {
          await Cart.findByIdAndUpdate(idforincrementincartupdate, incrementincartupdate);
          return res.json({ success: true, message: "product quantity in cart has been incremented", data: incrementincartupdate });
        } catch (error) {
          // console.error(error);
          return res.status(400).json({ success: false, errormessage: error.message });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(501).json({ success: false, errormessage: error.message });
    }
  });

router.route('/decrementincart')
  .post(async (req, res) => {
    try {
      const data = req.body;
      const cartdata = await Cart.findOne({ mobile: req.userval.mobile });
      const productsincart = [...cartdata.productsincart];
      const checkifproductexists = checkifexistsinarray(productsincart, data);
      if (checkifproductexists) {
        const newproductsincart = await decrementquantityinarray(productsincart, data);
        const idforincrementincartupdate = cartdata._id;
        const incrementincartupdate = { _id: idforincrementincartupdate, mobile: req.userval.mobile, productsincart: newproductsincart };
        try {
          await Cart.findByIdAndUpdate(idforincrementincartupdate, incrementincartupdate);
          return res.json({ success: true, message: "product quantity in cart has been deccremented", data: incrementincartupdate });
        } catch (error) {
          return res.status(400).json({ success: false, errormessage: error.message });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(501).json({ success: false, errormessage: error.message });
    }

  });

router.route('/emptycart')
.get(async ( req, res ) => {
  try {
  const cartdata = await Cart.findOne({ mobile: req.userval.mobile });
  const productsincart = [...cartdata.productsincart];
  const arraylength = productsincart.length;
  const cartid = cartdata._id;
  const emptycartdata = { _id: cartid, mobile: req.userval.mobile, productsincart: [] };
  if(arraylength>0){
    await Cart.findByIdAndUpdate(cartid, emptycartdata);
    return res.json({ success: false, message: "cart has been emptied" });
  }
  if(arraylength===0){
    return res.status(400).json({ success: false, message: "cart is already empty" });
  }
} catch (error) {
  console.error(error);
  res.status(500).json({ success: false, errormessage: error.message });}
});

module.exports = router;