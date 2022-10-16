var _ = require('underscore');
var arr = [3,6,9,1,12];

// first
console.log(arr[0]);
console.log(_.first(arr));

// last
console.log(arr[arr.length-1]);
console.log(_.last(arr));