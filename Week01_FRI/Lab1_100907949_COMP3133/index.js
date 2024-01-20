const fs = require('fs');
const csv = require('csv-parser');

// Define the input file path
const inputFile = 'input_countries.csv';

// Define the output file paths
const canadaOutputFile = 'canada.txt';
const usaOutputFile = 'usa.txt';

//Delete canada.txt and usa.txt if they already exist
fs.unlink(canadaOutputFile, (err) => {
    if (err && err.code !== 'ENOENT') {
        console.error('Error deleting canada.txt:', err);
    }
});
fs.unlink(usaOutputFile, (err) => {
    if (err && err.code !== 'ENOENT') {
        console.error('Error deleting usa.txt:', err);
    }
});
// Filter data for Canada and United States, and write to corresponding files

const canadaData = [];
const usaData = [];
fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => {
        const country = row['country'];

        if (country === 'Canada') {
            canadaData.push(`${row['country']},${row['year']},${row['population']}`);
        } else if (country === 'United States') {
            usaData.push(`${row['country']},${row['year']},${row['population']}`);
        }
    })
    .on('end', () => {
        fs.writeFileSync(canadaOutputFile, canadaData.join('\n'));
        fs.writeFileSync(usaOutputFile, usaData.join('\n'));
        console.log('Task completed successfully.');
    })
    .on('error', (err) => {
        console.error('Error reading CSV file:', err);
    });
