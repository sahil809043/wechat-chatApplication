const chatModel = require("../models/chat.models.js");
const globalChatModel = require("../models/globalChat.models.js")
const asyncHandler = require("../utils/asyncHandler.js");
require("dotenv").config()

const createChat = asyncHandler(async (req, res) => {
    const { firstId, secondId } = req.body;

    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] }
        });

        if (chat) return res.status(200).json(chat);

        const newChat = new chatModel({
            members: [firstId, secondId]
        });

        const response = await newChat.save();
        res.status(201).json(response);
    } catch (error) {
        console.error(`Error in createChat: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
});

const findUserChats = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    try {
        const chats = await chatModel.find({
            members: { $in: [userId], $size: 2 }
        });

        res.status(200).json(chats);
    } catch (error) {
        console.error(`Error in findUserChats: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
});

const findChat = asyncHandler(async (req, res) => {
    const { firstId, secondId } = req.params;

    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId], $size: 2 }
        });

        res.status(200).json(chat);
    } catch (error) {
        console.error(`Error in findChat: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
});

const removeChat = asyncHandler(async (req, res) => {
    const { firstId, secondId } = req.params;

    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] }
        });

        // If chat exists, proceed to delete
        if (chat) {
            await chatModel.deleteOne({ _id: chat._id });
            return res.status(200).json({ message: "Chat successfully deleted" });
        }

        // If no chat was found, respond with 404
        return res.status(404).json({ message: "Chat not found", token });

    } catch (error) {
        console.error(`Error at deleting chat: ${error.message}`);
        return res.status(500).json({ message: "Server Error" });
    }
});

const globalChat = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const chatId = process.env.GLOBAL_CHAT_ID;
    if (!chatId || !userId) {
        return res.status(400).json({
            message: `thik se kam kr`
        })
    }

    try {
        const chat = await globalChatModel.findById(chatId);

        if (!chat) return res.status(500).json({ error: true, message: "global chat not found" });

        if (!chat.members.includes(userId)) {
            chat.members.push(userId);  // Add userId to members if not already present
            await chat.save();

            return res.status(200).json({
                chat,
                message: "user added successfully"
            });
        } else {
            return res.status(200).json({
                chat,
                message: "user is already in the global chat"
            });
        }

    } catch (error) {
        console.error(`Error in adding user to global chat: ${error.message}`);
        res.status(500).json({ error: true, message: "Server error" });
    }
})

const findGlobalChat = asyncHandler(async (req, res) => {
    const globalChatId = req.params.chatId;

    try {
        const chat = await globalChatModel.findById(globalChatId);

        if (!chat) {
            return res.status(404).json({ error: true, message: "Global chat not found" });
        }

        return res.status(200).json(chat);
    } catch (error) {
        console.error(`Error in finding global chat: ${error.message}`);
        return res.status(500).json({ error: true, message: "Server Error" });
    }
});



module.exports = { createChat, findUserChats, findChat, removeChat, globalChat, findGlobalChat };