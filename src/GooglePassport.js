"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = require("passport");
var passport_google_oauth20_with_people_api_1 = require("passport-google-oauth20-with-people-api");
// Creates a Passport configuration for Google
var GooglePassport = /** @class */ (function () {
    function GooglePassport() {
        this.clientId = process.env.OAUTH_ID;
        this.secretId = process.env.OAUTH_SECRET;
        passport_1.default.use(new passport_google_oauth20_with_people_api_1.default({
            clientID: this.clientId,
            clientSecret: this.secretId,
            callbackURL: '/auth/google/callback',
        }, function (accessToken, refreshToken, profile, done) {
            console.log('inside new password google strategy');
            process.nextTick(function () {
                console.log('validating google profile:' +
                    JSON.stringify(profile));
                console.log('userId:' + profile.id);
                console.log('displayName: ' + profile.displayName);
                console.log('retrieve all of the profile info needed');
                // this.email = profile.emails[0].value;
                return done(null, profile);
            });
        }));
        passport_1.default.serializeUser(function (user, done) {
            done(null, user);
        });
        passport_1.default.deserializeUser(function (user, done) {
            done(null, user);
        });
    }
    return GooglePassport;
}());
exports.default = GooglePassport;
