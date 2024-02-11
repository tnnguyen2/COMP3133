const express = require('express');
const app = express();
const User = require('../models/Users.js');


// Route to create a new user
app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        const transformedUsers = users.map(user => ({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            website: user.website,
            address: {
                street: user.address.street,
                suite: user.address.suite,
                city: user.address.city,
                zipcode: user.address.zipcode,
                company: user.address.company,
                geo: user.address.geo
            },
            company: user.company,
        }));
        res.status(200).json(transformedUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = app;
