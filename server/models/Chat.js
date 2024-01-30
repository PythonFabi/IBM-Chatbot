const mongoose = require('mongoose');

const { Schema } = mongoose;

// create chat Schema to store chat and and timestamp
const chatSchema = new Schema({
    message: {
        type: String,
        
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;