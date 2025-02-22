"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../models/user"); // Ensure the path is correct
dotenv_1.default.config();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    var _a;
    try {
        // Check if user already exists by Google ID
        let user = await user_1.User.findOne({ googleId: profile.id });
        if (!user) {
            // If user doesn't exist, create a new one with just googleId and email
            user = new user_1.User({
                googleId: profile.id,
                email: (_a = profile.emails[0]) === null || _a === void 0 ? void 0 : _a.value, // Store email from profile
            });
            // Save the new user to the database
            await user.save();
        }
        // Pass the user object to the next middleware (session management)
        done(null, user);
    }
    catch (error) {
        done(error, null);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id); // Storing just the user ID in the session
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await user_1.User.findById(id); // Retrieve the user from the database
        done(null, user);
    }
    catch (err) {
        done(err, null);
    }
});
