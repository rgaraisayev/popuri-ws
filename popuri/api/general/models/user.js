const mongoose = require('mongoose');
const Schema = mongoose.Schema;


module.exports = mongoose.model('user', new Schema({
    name: String,
    mac: String,
    fcmToken: String,
    email: {
        type: String,
        unique: true
    },
    versionApp: Number,
    versionAppString: String,
    versionAndroid: String,
    dateUpdated: Date,
    dateWritten: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ['active', 'deactive'],
        default: 'active'
    },
    webs: String
}));