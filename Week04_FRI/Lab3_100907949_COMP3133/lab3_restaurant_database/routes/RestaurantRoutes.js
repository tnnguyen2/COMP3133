const express = require('express');
const app = express();
const restaurantModel = require('../models/Restaurant');

app.use(express.json());
//Route to return all restaurant details
app.get('/restaurants', async (req, res) => {
    const restaurants = await restaurantModel.find();
    try {
        res.json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).send;
    }
});

// Route to return all restaurant details by cuisine
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    const cuisine = req.params.cuisine;
    try {
        const restaurants = await restaurantModel.find({ cuisine: cuisine });
        res.status(200).json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

// Route to return selected columns and sorting by restaurant_id
// http://localhost:3000/restaurants?sortBy=ASC
// http://localhost:3000/restaurants?sortBy=DESC
app.get('/restaurants', async (req, res) => {
    try {
        const { sortBy } = req.query;
        let query = restaurantModel.find({});

        // Apply custom query helpers based on the sortBy parameter
        if (sortBy === "ASC") {
            query.sortByRestaurantId();
        } else if (sortBy === "DESC") {
            query.sortByRestaurantIdDesc();
        }

        const restaurants = await query;
        res.status(200).json(restaurants);
    } catch (err) {
        res.status(500).json({ message: "Error fetching restaurants", error: err });
    }
});


app.post('/restaurants/insertMany', async (req, res) => {
    try {
        const insertedRestaurants = await restaurantModel.insertMany(req.body);
        res.status(201).json(insertedRestaurants);
    } catch (err) {
        res.status(500).json({ message: "Error creating restaurants", error: err });
    }
});


// Route to return restaurants details where all cuisines are equal to Delicatessen and the city is not equal to Brooklyn
app.get('/restaurants/:cuisine', async (req, res) => {
    const restaurants = await restaurantModel.find({ cuisine: 'Delicatessen', city: { $ne: 'Brooklyn' } }, undefined, undefined);
    try {
        res.json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).send;
    }
});

module.exports = app;
