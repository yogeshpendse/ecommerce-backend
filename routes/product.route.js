const express = require('express')
// const app = express();
const router = express.Router();
const cors = require('cors');
router.use(cors());
router.use(express.json());


const { Product } = require('../models/product.model');

router.route('/getdata')
.get(async (req, res) => {
    const proddata =  await Product.find();
    res.json({ success : true, route:"getdata", data:proddata});
  });

router.route('/getthisprod/:prid')
.get(async (req, res) => {
  const docii = req.params;
  const proddata =  await Product.find({ prid:docii.prid });
  const datatobereturned = proddata[0];
  // res.json({ success : true, route:"getdata", data:proddata});
  res.json({ success : true, route:"getdata", data:datatobereturned});
  });


module.exports = router;