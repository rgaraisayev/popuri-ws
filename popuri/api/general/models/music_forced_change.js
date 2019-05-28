const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('music_forced_change', new Schema({
    music: {
        type: Schema.Types.ObjectId,
        ref: 'popuri_music'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'popuri_user'
    }
}));