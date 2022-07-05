const bcrypt = require("bcryptjs");
async function checkifpasswordsmatch (password, hashedpassword){
const isThereAPasswordMatch = await bcrypt.compare(password, hashedpassword);
return isThereAPasswordMatch;
}
module.exports = { checkifpasswordsmatch };