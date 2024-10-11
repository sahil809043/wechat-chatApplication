const jwt = require('jsonwebtoken');
const User = require('../models/user.models.js');
const asyncHandler = require('../utils/asyncHandler.js');
require("dotenv").config();

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // Extract token from either cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request: No token provided" });
        }

        // Verify token
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            console.error('JWT Verification Error:', error);
            return res.status(401).json({ message: "Invalid Access Token" });
        }

        // Find user by ID from decoded token
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");
        if (!user) {
            return res.status(401).json({ message: "Invalid access token" });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        console.error('Middleware Error:', error);
        return res.status(401).json({ message: error?.message || "Invalid Access Token" });
    }
});

module.exports = verifyJWT;