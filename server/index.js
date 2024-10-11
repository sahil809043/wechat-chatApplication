require("dotenv").config();
const mongoose = require("mongoose");
const app = require('./app');
const { Server } = require('socket.io');

(async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        const expressServer = app.listen(process.env.PORT, () => {
            console.log(`Database is successfully connected and application is running at port number ${process.env.PORT}`);
        });

        const io = new Server(expressServer, {
            cors: {
                origin: process.env.CLIENT_URL,
                methods: ["GET", "POST"]
            }
        });

        setupSocket(io);

    } catch (error) {
        console.error(`Error at database connection: ${error}`);
        process.exit(1);
    }
})();

function setupSocket(io) {
    let onlineUsers = [];

    io.on('connection', (socket) => {
        // console.log("New connection: ", socket.id);

        socket.on("addNewUser", (userId) => {
            if (!onlineUsers.some(user => user.userId === userId)) {
                onlineUsers.push({ userId, socketId: socket.id });
            }
            // console.log('Online users: ', onlineUsers);
            io.emit("getOnlineUsers", onlineUsers);
        });

        socket.on("sendMessage", (message) => {
            const user = onlineUsers.find(user => user?.userId === message?.receiverId);
            if (user) {
                io.to(user.socketId).emit("getMessage", message);
            }
        });

        socket.on("sendFriendRequest", ({ sender, receiver }) => {
            const user = onlineUsers.find(user => user?.userId === receiver);
            if (user) {
                io.to(user.socketId).emit("getFriendRequest", {
                    senderId: sender,
                    receiverId: receiver,
                    date: new Date(),
                    isRead: false
                });
            } else {
                console.log(`Receiver ${receiver} not online.`);
            }
        });

        socket.on("sendGlobalChatMessage", (message) => {
            io.emit("getGlobalChatMessage", message);
        });

        socket.on("disconnect", () => {
            onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
            io.emit("getOnlineUsers", onlineUsers);
        });
    });
}
