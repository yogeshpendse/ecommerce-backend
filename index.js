const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 7000;
const dburi = process.env.URI;
const { connecttodb } = require("./db/db.conn");
const productroute = require("./routes/product.route");
const cartroute = require("./routes/cart.route");
const wishlistroute = require("./routes/wishlist.route");
const userroute = require("./routes/user.route");
const { errorhandler } = require("./middlewares/errorhandler");
const { noroutehandler } = require("./middlewares/noroutehandler");
const { authhandler } = require("./middlewares/authhandler");
const { Product } = require("./models/product.model");

connecttodb(dburi);

app.get("/", (req, res) => {
  res.send("Hello Express app!");
});
function mdlware(req, res, next) {
  console.log("mdlware");
  const data = req.body;
  console.log(data);
  next();
}
app.use(mdlware);
app.use("/user", userroute);
app.use("/product", productroute);
app.use("/cart", cartroute);
app.use("/wishlist", wishlistroute);

// app.use(authhandler);
// app.get('/temporaryroute', (req, res) => {
//   res.json({ success:true, message:"this is /temporaryroute.", username: req.usernamefromtoken, userdata: req.userval.mobile});
// });

// app.post('/temporaryroute', async (req, res)=>{
// try {
// const { mobile } = req.body;
// const Op8 = new Product({ mobile, productsincart:[] });
// await Op8.save();
// res.json({ success:true, message:"user created in cart" });
// } catch (error) {
//   console.error(error);
//   res.status(400).json({success:false, errormessage:error.message});
// }
// });

app.use(errorhandler);
app.use(noroutehandler);

app.listen(port, () => {
  console.log("server started");
});
