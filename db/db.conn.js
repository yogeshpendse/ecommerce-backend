const mongoose = require("mongoose");
async function connecttodb(uri) {
  //   const uri = "mongodb+srv://Arcyogesh:WCj804l9BDHDqRS9@myecomm.aoyhu.mongodb.net/databaseone?retryWrites=true&w=majority";
  // mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false,useCreateIndex: true}).then(()=>console.log("connection success")).catch((error)=>console.log("connection failed"));
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection to DB Successful");
  } catch (error) {
    console.log(error);
    console.log(error.message);
    console.log("Connection to DB Failed");
  }
}

module.exports = { connecttodb };
