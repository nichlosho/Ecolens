import mongoose from 'mongoose';
import * as passport from 'passport';
import GoogleStrategy = require('passport-google-oauth20');
export function configGooglePassport(): void {
    passport.use(
        new GoogleStrategy.Strategy(
            {
                clientID: process.env.OAUTH_ID,
                clientSecret: process.env.OAUTH_SECRET,
                callbackURL:
                    process.env.IS_PROD === 'true'
                        ? `${process.env.SERVER_BASE_URL}/auth/google/callback`
                        : `${process.env.SERVER_BASE_URL}${
                              process.env.BACKEND_PORT || ''
                          }/auth/google/callback`,
            },
            async (token, tokenSecret, profile, done) => {
                try {
                    const userModel = mongoose.models.Users;
                    const existingUser = await userModel.findOne({
                        ssoId: profile.id,
                    });
                    const user = {
                        firstName: existingUser
                            ? existingUser.firstName
                            : profile.displayName,
                        email: profile.emails?.[0].value,
                        photo: profile.photos?.[0].value,
                        ssoId: profile.id,
                    };
                    await userModel.findOneAndUpdate(
                        { ssoId: user.ssoId },
                        user,
                        {
                            new: true,
                            upsert: true,
                            setDefaultsOnInsert: true,
                        }
                    );
                    done(null, user);
                } catch (err) {
                    done(err, null);
                }
            }
        )
    );
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}
