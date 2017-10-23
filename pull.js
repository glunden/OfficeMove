var fs = require('fs');

// fs.readFile('addressList.csv', 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

fs.readFileSync('addressList.csv').toString().split('\n').forEach(function (line) { 
    var address1 = line;
    fs.appendFileSync("./output.txt", line.toString() + "\n");
});