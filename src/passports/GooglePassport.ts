import mongoose from 'mongoose';
import * as passport from 'passport';
import GoogleStrategy = require('passport-google-oauth20');
class GooglePassport {
    public clientId: string;
    public secretId: string;

    constructor() {
        this.clientId = process.env.OAUTH_ID;
        this.secretId = process.env.OAUTH_SECRET;

        passport.use(
            new GoogleStrategy.Strategy(
                {
                    clientID: this.clientId,
                    clientSecret: this.secretId,
                    callbackURL: `${process.env.SERVER_BASE_URL}${process.env.BACKEND_PORT}/auth/google/callback`,
                },
                async (accessToken, refreshToken, profile, done) => {
                    try {
                        const userModel = mongoose.models.Users;
                        const user = {
                            firstName: profile.displayName,
                            email: profile.emails?.[0].value,
                            photo: profile.photos?.[0].value,
                            ssoId: profile.id,
                        };
                        await userModel.findOneAndUpdate(
                            { ssoId: profile.id },
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

        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(async (id, done) => {
            const userModel = mongoose.models.Users;
            const currentUser = await userModel.find(id);
            done(null, currentUser);
        });
    }
}
export default GooglePassport;
