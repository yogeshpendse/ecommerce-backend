const { extend } = require('lodash');
function incrementquantityinarray ( arr, obj ){
  const newarr = [...arr];
  const newop = newarr.map(x =>{
  if(x.prid === obj.prid){
    const op8 = extend(x, { quantity: x.quantity + 1 } );
    return op8;
  }
  if(x.prid !== obj.prid){
    return x;
  }  
}
);
  return newop;
};
function decrementquantityinarray ( arr, obj ){
  const newarr = [...arr];
  const newop = newarr.map(x => {
  if(x.prid === obj.prid){
    const op8 = extend(x, { quantity: x.quantity - 1 } );
    return op8;
  }
  if(x.prid !== obj.prid){
    return x;
  }
  });
  return newop;
};
module.exports = { incrementquantityinarray, decrementquantityinarray };