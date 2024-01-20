const fs = require('fs');

const readStream = fs.createReadStream('data.txt', 'utf8');
const writeStream = fs.createWriteStream('out_stream.txt');

//Called when the stream has data to read
readStream.on('data', (chunk) => {
    console.log('Reading data...');
    //writeStream.write(chunk);
    console.log(chunk)
});

//Called where there is an error reading the stream
readStream.on('error', (error) => {
    console.log(`Error reading file: ${error}`);
});
//Called when the end of the stream is reached
readStream.on('end', () => {
    console.log('Finished reading data.');
    writeStream.end();
});

//Called error writing the stream
writeStream.on('error', (error) => {
    console.log(`Error writing file: ${error}`);
})

//Called when the end of the stream is closed
writeStream.on('close', () => {
    console.log('Finished writing data.');
})

writeStream.write('1 - Hello World!');
writeStream.write('2 - Hello World!');
writeStream.write('3 - Hello World!');
writeStream.end();
