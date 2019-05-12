const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('popuri_music', new Schema({
    duration: Number,
    song: {
        author: String,
        name: String
    },
    name: String,
    format: String,
    name: String,
    lang: String,
    dateWritten: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Number,
        enum: [1, 0],
        default: 1
    }
}));