const bcrypt = require("bcryptjs");
async function hashthispassword ( password ){
const salt = await bcrypt.genSalt(10);
const hashedpassword = await bcrypt.hash(password, salt);
return hashedpassword;
};
module.exports = { hashthispassword };