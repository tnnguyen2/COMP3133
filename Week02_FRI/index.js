console.log('Week02 -FS and Streams Examples');
const fs = require('fs');
//Read a file
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
})
console.log('After readFile');

//Read a file synchronously
const data = fs.readFileSync('data.txt', 'utf8');
console.log(`Sync: ${data}`);
console.log('End readFile');

//Write a file
const data_to_write = 'Hello World';
fs.writeFile('data.txt', data_to_write, (err) => {
    if (err) throw err;
    console.log('File Written');
});
console.log('After writeFile');

//Write a file synchronously
const data_to_write_sync = 'Hello*World';
fs.writeFileSync('out_data.txt', data_to_write_sync);
console.log('** End writeFile');