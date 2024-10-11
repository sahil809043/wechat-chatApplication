const messageModel = require('../models/message.models.js');
const asyncHandler = require("../utils/asyncHandler.js");

const createMessage = asyncHandler(async (req, res) => {
    const { text, chatId, senderId } = req.body;

    try {
        const message = new messageModel({ text, chatId, senderId });
        const response = await message.save();
        res.status(201).json(response);
    } catch (error) {
        console.error(`Error in createMessage: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
});

const getMessages = asyncHandler(async (req, res) => {
    const chatId = req.params.chatId;

    try {
        const messages = await messageModel.find({ chatId });
        res.status(200).json(messages);
    } catch (error) {
        console.error(`Error in getMessages: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = { createMessage, getMessages };