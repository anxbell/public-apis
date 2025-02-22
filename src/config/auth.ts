import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { User } from "../models/user"; // Ensure the path is correct

dotenv.config();

// Manual defining types for Profile and VerifyCallback
interface Profile {
    id: string;
    displayName: string;
    name: {
        familyName: string;
        givenName: string;
    };
    emails: { value: string }[];
    photos: { value: string }[];
}

type VerifyCallback = (error: any, user?: any, info?: any) => void;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            try {
                // Check if user already exists by Google ID
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    // If user doesn't exist, create a new one with just googleId and email
                    user = new User({
                        googleId: profile.id,
                        email: profile.emails[0]?.value, // Store email from profile
                    });

                    // Save the new user to the database
                    await user.save();
                }

                // Pass the user object to the next middleware (session management)
                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user.id); // Storing just the user ID in the session
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id); // Retrieve the user from the database
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
