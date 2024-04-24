import express, { Router } from 'express';
import passport from 'passport';
import { IBaseRouter } from 'src/interfaces/IRouter';

export class GoogleRouter implements IBaseRouter {
    private _router: Router;
    public get router(): Router {
        return this._router;
    }
    private set router(value: Router) {
        this._router = value;
    }

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        // ----------------------------------- GET -----------------------------------\\
        this._router.get(
            '/',
            passport.authenticate('google', { scope: ['profile'] })
        );

        this._router.get(
            '/callback',
            passport.authenticate('google', { failureRedirect: '/' }),
            (req, res) => {
                console.log(
                    'successfully authenticated user and returned to callback page.'
                );
                console.log('redirecting to /#/list');
                res.redirect('/#/list');
            }
        );
    }
}
