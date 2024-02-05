const express = require('express');
const mongoose = require('mongoose');
const restaurantRoutes = require('./routes/RestaurantRoutes');


const app = express();
app.use(express.json());

const port = 3000;

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

app.use(restaurantRoutes);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
