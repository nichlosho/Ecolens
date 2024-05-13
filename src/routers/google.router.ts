import * as express from 'express';
import passport from 'passport';
import { IBaseRouter } from '../interfaces/IRouter';

export class GoogleRouter implements IBaseRouter {
    private _router: express.Router;
    public get router(): express.Router {
        return this._router;
    }
    private set router(value: express.Router) {
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
