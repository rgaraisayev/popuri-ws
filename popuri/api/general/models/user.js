const mongoose = require('mongoose');
const Schema = mongoose.Schema;


module.exports = mongoose.model('popuri_user', new Schema({
    name: String,
    uniqueKey: String,
    fcmToken: String,
    email: {
        type: String,
        unique: true
    },
    versionCode: Number,
    dateUpdated: Date,
    dateWritten: {
        type: Date,
        default: Date.now()
    }
}));