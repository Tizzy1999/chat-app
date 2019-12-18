var counter = function(arr){
  return 'There are '+ arr.length + ' elements in this array';
};

var adder = function(a,b){
  // In template strings, we can embed variables
  // or expressions without concatenation

  return  `The sum of the 2 numbers is ${a+b}`;
};

var pi = 3.142;
// module.exports is just an empty objetc
// we can add properties to this object
module.exports.counter = counter;
module.exports.adder = adder;
module.exports.pi = pi;
