const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
        default: "mario"
    },
    countryCode: String,
    score: {
        type: String,
        default: "000000"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastPlayed: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };