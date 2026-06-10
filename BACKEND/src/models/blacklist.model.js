const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: [true, "Token is required"],
            unique: true,
            index: true
        }
    },
    {
        timestamps: true
    }
);

/* ---------------- OPTIONAL CLEANUP (AUTO DELETE AFTER 1 DAY) ---------------- */
// If you want auto cleanup of old blacklisted tokens:
blacklistTokenSchema.index(
    { createdAt: 1 },
    { expireAfterSeconds: 60 * 60 * 24 } // 1 day
);

const tokenBlacklistModel = mongoose.model(
    "blacklist_token",
    blacklistTokenSchema
);

module.exports = tokenBlacklistModel;