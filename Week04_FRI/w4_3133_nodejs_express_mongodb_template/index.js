const express = require('express');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/EmployeeRoutes.js');


const app = express();
app.use(express.json()); // Make sure it comes back as json


//TODO - Replace you Connection String here
const DB_HOST = "@cluster0.hgh3k7b.mongodb.net";
const DB_USER = "tdotnguyen";
const DB_PASSWORD = "JA5Dkz4KLhZMBsTC";
const DB_NAME = "W2024_COMP3133_FRI";
const DB_CONNECTION = `mongodb+srv://${DB_USER}:${DB_PASSWORD}${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection',err)
});

app.use(employeeRoutes);

const SERVER_PORT = 8081;

app.listen(SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${SERVER_PORT}/`);
});