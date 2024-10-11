const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    text: String,
    chatId: String,
    senderId: String // Ensure this matches with the field in your payload
}, {
    timestamps: true
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;