function checkifexistsinarray ( array , objecttobechecked ){
const temparray = [ ...array ];
const valtobereturned = temparray.some(x => x.prid === objecttobechecked.prid);
return valtobereturned;
};
module.exports = { checkifexistsinarray };