const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const data = new Schema({
    emoji: {
        type: String
    },
    emotion: {
        type: String
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: String,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Emotion",data);