"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_1 = __importDefault(require("passport"));
const user_1 = require("../models/user");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, params, profile, done) => {
    try {
        let user = await user_1.User.findOne({ googleId: profile.id });
        if (!user) {
            const email = profile.emails && profile.emails[0] ? profile.emails[0].value : undefined;
            user = new user_1.User({
                googleId: profile.id,
                email: email,
            });
            await user.save();
        }
        done(null, user);
    }
    catch (error) {
        done(error, null);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await user_1.User.findById(id);
        done(null, user);
    }
    catch (err) {
        done(err, null);
    }
});
