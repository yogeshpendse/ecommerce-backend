function addtoarray ( arr, obje ){
  const newarr = [...arr];
  const arrtobereturned = [...newarr, obje];
  return arrtobereturned;
}

module.exports = { addtoarray };