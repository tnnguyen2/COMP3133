const fs = require('fs');

//r - Open file for reading. An exception occurs if the file does not exist.
//r+ - Open file for reading and writing. An exception occurs if the file does not exist.
//rs - Open file for reading in synchronous mode. Instructs the operating system to bypass the local file system cache.
//rs+ - Open file for reading and writing, telling the OS to open it synchronously. See notes for 'rs' about using this with caution.
//w - Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
//wx - Like 'w' but fails if the path exists.
//w+ - Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
//wx+ - Like 'w+' but fails if the path exists.
//a - Open file for appending. The file is created if it does not exist.
//ax - Like 'a' but fails if the path exists.
//a+ - Open file for reading and appending. The file is created if it does not exist.
//ax+ - Like 'a+' but fails if the path exists.

fs.open('out_data.txt', 'a+', (err, fd) => {
    if (err) {
        console.log(err);
        throw err;
    }
//
//     // Read the file
//     fs.read(fd, (err, data, bytesRead) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         console.log(`Read ${bytesRead} bytes from file`);
//         console.log(data.toString());
//     })
// })

    const data_to_write = Buffer.from('Hello World again!');
    fs.write(fd, data_to_write, (err, written,str) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(`Wrote ${written} bytes to file`);
        console.log(str);
    })

    const buffer = Buffer.alloc(1024);
    fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(`Read ${bytesRead} bytes from file`);
        console.log(buffer.toString());
    })
})
