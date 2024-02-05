const express = require('express');
const app = express();
const restaurantModel = require('../models/Restaurant');

//Route to return all restaurant details
app.get('/restaurants', async (req, res) => {
    const restaurants = await restaurantModel.find(undefined, undefined, undefined);
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
    const restaurants = await restaurantModel.find({ cuisine: cuisine }, undefined, undefined);
    try {
        res.status(200).json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

// Route to return selected columns and sorting by restaurant_id
// http://localhost:3000/restaurants?sortBy=ASC
// http://localhost:3000/restaurants?sortBy=DESC
app.get("/restaurants", async (req, res) => {
    const sortBy = req.query.sortBy;
    let sortOption = {};

    if (sortBy === "ASC") {
        sortOption = { 'restaurant_id': 1 };
    } else if (sortBy === "DESC") {
        sortOption = { 'restaurant_id': -1 };
    }

    try {
        const restaurants = await restaurantModel.find(undefined, undefined, undefined ).sort(sortOption);
        res.status(200).send(restaurants);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Route to return restaurants details where all cuisines are equal to Delicatessen and the city is not equal to Brooklyn
app.get('/restaurants/Delicatessen', async (req, res) => {
    const restaurants = await restaurantModel.find({ cuisine: 'Delicatessen', city: { $ne: 'Brooklyn' } }, undefined, undefined);
    try {
        res.json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).send;
    }
});

module.exports = app;
