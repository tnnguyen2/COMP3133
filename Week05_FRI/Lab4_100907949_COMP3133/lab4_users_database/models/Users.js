const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
            },
            message: props => `${props.value} is not a valid email address!`
        },
    },

    address: {
        street: {
            type: String,
            required: true
        },
        suite: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: (city) => {
                    const cityRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
                    return cityRegex.test(city);
                }
            },
        },
        zipcode: {
            type: String,
            required: true,
            validate: {
                validator: (zipcode) => {

                    const zipCodeRegex = /^\d{5}-\d{4}$/;
                    return zipCodeRegex.test(zipcode);
                },
                message: 'Zip code must be in the format XXXXX-XXXX'
            }
        },
        geo: {
            lat: {
                type: String,
                required: true
            },
            lng: {
                type: String,
                required: true
            }
        }
    },

    phone: {
        type: String,
        required: true,
        validate: {
            validator: (phone) => {
                const phoneRegex = /^\d-\d{3}-\d{3}-\d{4}$/;
                return phoneRegex.test(phone);
            },
            message: 'Phone number must be in the format x-XXX-XXX-XXXX'
        }
    },
    website: {
        type: String,
        required: true,
        validate: {
            validator: (website) => {
                // check if it is http or https then the domain name
                const urlRegex = /^(http|https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
                return urlRegex.test(website);
            },
            message: url => `${url.value} is not a valid URL`
        }
    },
    company: {
        name: {
            type: String,
            required: true
        },
        catchPhrase: {
            type: String,
            required: true
        },
        bs: {
            type: String,
            required: true
        }
    }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
