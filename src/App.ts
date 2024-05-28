import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import * as passport from 'passport';
import { ProductRouter } from './routers/products.router';
import { UserRouter } from './routers/user.router';
import express = require('express');
import cors = require('cors');
import cookieParser = require('cookie-parser');
import session = require('express-session');
import GoogleStrategy = require('passport-google-oauth20');

export class App {
    private _expressApp: express.Application;
    public get expressApp(): express.Application {
        return this._expressApp;
    }

    private _productRouter: ProductRouter;
    private _userRouter: UserRouter;

    constructor(mongoDBConnectionUrl: string) {
        this._expressApp = express();
        this.configExpressMiddleware();
        this.configPassport();
        this.initializeRouters(mongoDBConnectionUrl);
        this._expressApp.use(
            '/',
            express.static('/home/site/wwwroot/ecolens/index.html')
        );
    }

    private initializeRouters(mongoDBConnectionUrl: string): void {
        // Product router
        this._productRouter = new ProductRouter(mongoDBConnectionUrl);
        this.expressApp.use('/products', this._productRouter.router);

        // User router
        this._userRouter = new UserRouter(mongoDBConnectionUrl);
        this.expressApp.use('/users', this._userRouter.router);

        //Cart router

        //Checkout router
    }
    private configExpressMiddleware(): void {
        this._expressApp.use(
            cors({ origin: process.env.FRONT_END_URL, credentials: true })
        );
        this._expressApp.use(bodyParser.json());
        this._expressApp.use(bodyParser.urlencoded({ extended: false }));
        this._expressApp.use((req, res, next) => {
            res.header(
                'Access-Control-Allow-Origin',
                process.env.FRONT_END_URL
            );
            res.header(
                'Access-Control-Allow-Headers',
                'Content-Type, Authorization'
            );
            res.header(
                'Access-Control-Allow-Methods',
                'OPTIONS, GET, POST, PUT, PATCH, DELETE'
            );
            next();
        });
        this._expressApp.use(express.json());
    }
    private configPassport() {
        // Configure Passport with Google Strategy
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
                    scope: ['profile', 'email'],
                },
                async (token, tokenSecret, profile, done) => {
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

        passport.serializeUser((user, done) => {
            done(null, user);
        });

        passport.deserializeUser((user, done) => {
            done(null, user);
        });

        this._expressApp.use(cookieParser());
        this._expressApp.use(
            session({
                secret: 'keyboard cat',
                resave: false,
                saveUninitialized: false,
            })
        );

        this._expressApp.use(passport.initialize());
        this._expressApp.use(passport.session());

        const corsHeaders = (req, res, next) => {
            res.header(
                'Access-Control-Allow-Origin',
                process.env.FRONT_END_URL
            );
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.header(
                'Access-Control-Allow-Methods',
                'GET, POST, OPTIONS, PUT, PATCH, DELETE'
            );
            res.header(
                'Access-Control-Allow-Headers',
                'X-Requested-With,content-type'
            );
            res.header('Access-Control-Allow-Credentials', true);
            next();
        };

        // Authentication routes
        this._expressApp.get('/auth/google', passport.authenticate('google'));

        this._expressApp.get(
            '/auth/google/callback',
            corsHeaders,
            passport.authenticate('google', {
                failureRedirect: `${process.env.FRONT_END_URL}/signin`,
                successRedirect: process.env.FRONT_END_URL,
            })
        );
        this._expressApp.get('/auth/google/user', corsHeaders, (req, res) => {
            const user = req.user;
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(401).json({ message: 'User not authenticated' });
            }
        });

        this.expressApp.get('/auth/google/logout', (req, res) => {
            req.logout((err) => {
                console.log('logging out');
                if (err) {
                    console.error('logout error', err);
                }
                res.redirect(process.env.FRONT_END_URL);
            });
        });
    }
}
