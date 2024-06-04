import express = require('express');
import { IBaseRouter } from '../interfaces/IRouter';
import passport = require('passport');

export class GoogleRouter implements IBaseRouter {
    private _router: express.Router;
    public get router(): express.Router {
        return this._router;
    }
    private set router(value: express.Router) {
        this._router = value;
    }
    private _frontendUrl: string = '';

    constructor(frontendUrl: string) {
        this._frontendUrl = frontendUrl;
        this.router = express.Router();
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        const corsHeaders = (req, res, next) => {
            res.header('Access-Control-Allow-Origin', this._frontendUrl);
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

        this.router.get(
            '/',
            passport.authenticate('google', {
                scope: ['profile', 'email'],
                prompt: 'select_account',
            })
        );
        this.router.get(
            '/callback',
            corsHeaders,
            passport.authenticate('google', {
                failureRedirect: `${this._frontendUrl}/signin`,
                successRedirect: this._frontendUrl,
            })
        );
        this.router.get('/user', corsHeaders, (req, res) => {
            const user = req.user;
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(401).json({ message: 'User not authenticated' });
            }
        });
        this.router.get('/signOut', corsHeaders, (req, res) => {
            try {
                req.logOut(req.user, function (err) {
                    if (err) {
                        console.log('error', err);
                        return;
                    }
                });
            } catch (e) {
                console.log(e);
            }
            res.json(req.isAuthenticated());
        });
    }
}
