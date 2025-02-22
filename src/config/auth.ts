import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../models/user";
import { Request } from "express";
import dotenv from "dotenv";

dotenv.config();

// Define the VerifyCallback manually
type VerifyCallback = (error: any, user?: any, info?: any) => void;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      passReqToCallback: true,
    },
    async (req: Request, accessToken: string, refreshToken: string, params: any, profile: any, done: VerifyCallback) => { // Use `any` for profile to avoid typings conflict
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const email = profile.emails && profile.emails[0] ? profile.emails[0].value : undefined;

          user = new User({
            googleId: profile.id,
            email: email,
          });

          await user.save();
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});