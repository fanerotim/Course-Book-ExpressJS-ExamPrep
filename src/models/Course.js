const mongoose = require('mongoose');

let courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5
    },
    type: {
        type: String,
        required: true,
        minLength: 3
    },
    certificate: {
        type: String,
        required: true,
        minLength: 2,
    },
    imageUrl: {
        type: String,
        required: true,
        match: /^http[s]?\:\/\//
    },
    description: {
        type: String,
        required: true,
        minLength: 10
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    signUpList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;