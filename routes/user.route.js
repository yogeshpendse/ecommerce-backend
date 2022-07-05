const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();
const cors = require('cors');
router.use(cors());
router.use(express.json());
const { hashthispassword } = require('../functions/hashthispassword');
const { checkifpasswordsmatch } = require('../functions/checkifpasswordsmatch');
const { signwithjwt } = require('../functions/signwithjwt');
const { addtousercollection, addtocartcollection, addtowishlistcollection } = require('../functions/usercreation');
const { User } = require('../models/user.model');


router.route('/routechecker')
  .get(async (req, res) => {
    res.json({ success: true, route: "user-route" });
  });

router.route('/checifuserispresent')
  .post(async (req, res) => {
    try {
      const opaque = req.body;
      console.log(opaque);
      const op = await User.findOne({ username: opaque.username });
      console.log({ op });
      if (op) {
        return res.json({ success: true, route: "user-route", op });
      }
      res.json({ success: false, route: "user-route" });
    } catch (error) {
      res.status(500).json({ success: false, route: "user-route" });
    }
  });

router.route('/signup')
  .post(async (req, res) => {
    try {
      const { username, password, mobileno, name } = req.body;
      const hashedpassword = await hashthispassword(password);
      const doesuserexist = await User.findOne({ username });
      const doesmobileexist = await User.findOne({ mobile: Number(mobileno) });

      if (doesmobileexist) {
        return res.status(400).json({ success: false, message: "mobileno already taken" });
      }
      if (doesuserexist) {
        return res.status(400).json({ success: false, message: "user already exists" });
      }
      console.log("Now user will be added");
      // const Newuser = new User({ username, password:hashedpassword, mobile : mobileno, name });
      // await Newuser.save();
      const userpromise = await addtousercollection(username, hashedpassword, Number(mobileno), name);
      console.log("checkpoint 1");
      const cartpromise = await addtocartcollection(username, Number(mobileno));
      console.log("checkpoint 1");
      const wishlistpromise = await addtowishlistcollection(username, Number(mobileno));
      console.log("checkpoint 1");
      res.json({ success: userpromise, message: "User is created" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, errormessage: error.message, error });
    }
  });

router.route('/login')
  .post(async (req, res) => {
    try {
      console.log("hitting login", Date.now());
      const data = req.body;
      const doesuserexist = await User.findOne({ username: data.username });
      if (doesuserexist === null) {
        return res.status(400).json({ success: false, message: "user doesn't exist" });
      }
      const dopasswordsmatch = await checkifpasswordsmatch(
        data.password,
        doesuserexist.password
      );

      if (dopasswordsmatch) {
        const { username } = doesuserexist;
        const token = await signwithjwt(username);
        return res.json({ success: true, username, token });
      }

      if (!dopasswordsmatch) {
        return res
          .status(401)
          .json({ success: false, errormessage: "passwords don't match" });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false, errormessage: error.message });
    }
  });

module.exports = router;