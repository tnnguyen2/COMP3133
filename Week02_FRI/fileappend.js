const fs = require('fs');

// Append to a file
async function appendData(str) {
    try {
        await fs.appendFile('out_data.txt', str, ()=>{'a+'})
        console.log('File appended');
    } catch (error) {
        console.log(error);
    }
}
appendData('\n1 - George Brown College!').then(r => (console.log(r)));
appendData('\n2 - George Brown College!').then(r => (console.log(r)));
appendData('\n3 - George Brown College!').then(r => (console.log(r)));

// fs.appendFileSync('out_data.txt', "Pritesh Patel");