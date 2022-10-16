var fs = require('fs');

// sync
console.log(1);
var data = fs.readFileSync('file/data.txt', {encoding: 'utf-8'});
console.log(data);

// async
console.log(2);
var data = fs.readFile('file/data.txt', {encoding: 'utf-8'}, (err, data) => {
    console.log(4);
    console.log(data);
});
console.log(3);