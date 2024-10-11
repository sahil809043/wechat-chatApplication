const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user.routes.js');
const chatRoutes = require('./routes/chat.routes.js');
const messageRoutes = require('./routes/message.routes.js');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/messages", messageRoutes);

app.get('/', (req, res) => {
    res.send('This is a chat application');
});

module.exports = app;
