const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Authentication token missing"
            });
        }

        // Check blacklist
        const blacklisted = await tokenBlacklistModel.findOne({ token });

        if (blacklisted) {
            return res.status(401).json({
                message: "Token is no longer valid (logged out)"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.id) {
            return res.status(401).json({
                message: "Invalid token payload"
            });
        }

        // Attach clean user object
        req.user = {
            id: decoded.id,
            username: decoded.username
        };

        next();

    } catch (error) {
        // differentiate expired token
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token expired, please login again"
            });
        }

        return res.status(401).json({
            message: "Unauthorized access"
        });
    }
}

module.exports = { authUser };