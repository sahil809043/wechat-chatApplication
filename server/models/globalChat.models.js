const mongoose = require('mongoose')

const globalChatSchema = new mongoose.Schema({
    members: Array
})

const GlobalChat = mongoose.model("GlobalChat", globalChatSchema)
module.exports = GlobalChat;