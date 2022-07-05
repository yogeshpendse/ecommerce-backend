function removeelemntfromarray (arr, obj){
  const array = [...arr];
  const objval = { ...obj };
  const newarray = array.filter(x => x.prid !== objval.prid);
  return newarray;
}



module.exports = { removeelemntfromarray };