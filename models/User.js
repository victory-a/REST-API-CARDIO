const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        min: 5,
        max: 100,
        required: true
    },
    email: {
        type: String,
        min: 6,
        max: 255,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)