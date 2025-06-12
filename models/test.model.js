const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['kreativlik', 'noodatiy', 'raqamli', 'situation']
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    questions: [{
        id: Number,
        text: String,
        options: [{
            text: String,
            score: Number
        }]
    }]
});

module.exports = mongoose.model('Test', testSchema); 