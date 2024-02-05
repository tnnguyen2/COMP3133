// routes.js
const express = require('express');
const app = express();
const Restaurant = require('../models/Restaurant');

// Route to return all restaurant details
app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to return all restaurant details by cuisine
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    const cuisine = req.params.cuisine;
    try {
            const restaurants = await Restaurant.find({ cuisine: cuisine});
            res.json(restaurants);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Route to return selected columns and sorting by restaurant_id
app.get('/restaurants', async (req, res) => {
    const sortBy = req.query.sortBy || 'ASC';
    try {
        const columns = ['id', 'cuisine', 'name', 'city', 'restaurant_id'];
        const sortOrder = sortBy === 'ASC' ? 1 : -1;
        const restaurants = await Restaurant.find().select(columns.join(' ')).sort({ restaurant_id: sortOrder });
        res.json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to return restaurants details where all cuisines are equal to Delicatessen and the city is not equal to Brooklyn
app.get('/restaurants/Delicatessen', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({ cuisine: 'Delicatessen', city: { $ne: 'Brooklyn' } })
            .select('cuisine name city -_id')
            .sort({ name: 1 });
        res.json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = app;
