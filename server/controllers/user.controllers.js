const User = require('../models/user.models.js')
const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler.js')
const jwt = require('jsonwebtoken')
require("dotenv").config()


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) throw new Error('User not found');

        const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        });

        const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        });

        user.refreshToken = refreshToken;
        user.accessToken = accessToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error('Error generating tokens:', error);
        throw new Error('Something went wrong! Please try again later.');
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    const { username, email, password, confirmPassword } = req.body;

    if ([email, username, password, confirmPassword].some(field => !field.trim())) {
        return res.status(400).json({ error: true, message: "Please fill all the credentials" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: true, message: "both the password fields should be same" });
    }

    const checkUsername = await User.findOne({ username });
    if (checkUsername) {
        return res.status(400).json({ error: true, message: "username alredy taken" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: true, message: "User already exist" });
        }

        const newUser = await User.create({
            email,
            password,
            username: username.toLowerCase(),
            uniqueId: result,
            profileImage: "data:image/png;base64,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"
        });

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(newUser._id);

        return res.status(201).json({
            error: false,
            user: { ...newUser.toObject(), accessToken, refreshToken }
        });
    } catch (error) {
        console.error('Error in registerUser:', error);
        return res.status(500).json({ error: true, message: "Server error. Please try again later" });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email.trim() || !password.trim()) {
        return res.status(400).json({ error: true, message: "Please provide both email and password" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: true, message: "Invalid email or password" });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: true, message: "Invalid email or password" });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        return res.status(200).json({
            error: false,
            user: { ...user.toObject(), accessToken, refreshToken }
        });
    } catch (error) {
        console.error('Error in loginUser:', error);
        return res.status(500).json({ error: true, message: "Server error. Please try again later" });
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    const { refreshToken, password } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ error: true, message: "No refresh token provided" });
    }

    try {
        const user = await User.findOne({ refreshToken });
        if (user) {
            const isPasswordValid = await user.isPasswordCorrect(password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: true, message: "Invalid password" });
            } else {
                user.refreshToken = null;
                await user.save();
            }
        }

        res.status(200).json({ error: false, message: "Logged out successfully" });
    } catch (error) {
        console.error('Error in logoutUser:', error);
        return res.status(500).json({ error: true, message: "Server error. Please try again later" });
    }
});

const findUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const user = await User.findById(userId);


    return res.status(200)
        .json(user);
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();

    return res.status(200)
        .json(users)
});

const updateUserInfo = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const { name, mail, profileImage } = req.body;

    try {
        const previousInfo = await User.findById(userId);

        if (!previousInfo) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { username: name, email: mail, profileImage }, // Make sure profileImage is updated
            { new: true, runValidators: true }
        );

        // Generate tokens
        const tokens = generateAccessAndRefreshTokens(userId);

        return res.status(200).json({
            user,
            tokens
        });
    } catch (error) {
        console.error('Error updating user info:', error);
        res.status(500).json({ error: true, message: "Server error" });
    }
});

const changePassword = asyncHandler(async (req, res) => {
    const { email, newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
        res.status(400).json({ error: true, message: `New Password field and Confirm Password field should be same` })
    }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ error: true, message: "Invalid email" });
        }

        user.password = newPassword;
        await user.save();

        return res.status(200).json({ error: false, message: `your password is changed succesfully` })

    } catch (error) {
        console.error(`An error ocured while changing your password ${error.message}`);
        res.status(500).json({ message: `server error` })
    }
})

const setRequest = asyncHandler(async (req, res) => {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId) {
        return res.status(400).json({ error: true, message: 'Bad request' });
    }

    try {
        const user = await User.findById(receiverId);

        if (!user) {
            return res.status(404).json({ message: 'Cannot send request to this user' });
        }

        const existingRequest = user.requests.find(
            (request) => request.senderId.toString() === senderId.toString() && request.receiverId.toString() === receiverId.toString()
        );

        if (existingRequest) {
            return res.status(400).json({ error: true, message: 'Request already sent' });
        }

        user.requests.push({ senderId, receiverId, isRead: false });
        await user.save();

        return res.status(200).json({
            user,
            message: 'Request sent successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});


const getRequest = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ error: true, message: 'Bad request: userId is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: true, message: 'Invalid userId format' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: true, message: 'Cannot find this user' });
        }

        const requests = user.requests;

        return res.status(200).json(requests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: `Server error: ${error.message}` });
    }
});

const deletRequest = asyncHandler(async (req, res) => {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId) {
        return res.status(400).json({ error: true, message: `bad request` });
    }

    try {
        const user = await User.findById(receiverId)

        if (!user) {
            return res.status(400).json({ error: true, message: `no user found` });
        }

        user.requests = user.requests.filter(
            (request) => request.senderId.toString() !== senderId.toString() || request.receiverId.toString() !== receiverId.toString()
        );
        await user.save();

        return res.status(200).json({ error: false, message: `request ignored succesfully` });
    } catch (error) {
        return res.status(500).json({ error: true, message: `server error! please try again later` })
    }
})




module.exports = {
    registerUser,
    loginUser,
    findUser,
    getAllUsers,
    updateUserInfo,
    logoutUser,
    changePassword,
    setRequest,
    getRequest,
    deletRequest,
}