import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import { configGooglePassport } from './passports/GooglePassport';
import { GoogleRouter } from './routers/google.router';
import { ProductRouter } from './routers/products.router';
import { UserRouter } from './routers/user.router';
import express = require('express');
import cors = require('cors');
import cookieParser = require('cookie-parser');
import session = require('express-session');

export class App {
    private _expressApp: express.Application;
    public get expressApp(): express.Application {
        return this._expressApp;
    }

    private _productRouter: ProductRouter;
    private _userRouter: UserRouter;
    private _googleRouter: GoogleRouter;

    constructor(mongoDBConnectionUrl: string) {
        this._expressApp = express();
        this.configExpressMiddleware();
        this.configPassports();
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

        //Google router
        this._googleRouter = new GoogleRouter(process.env.FRONT_END_URL);
        this.expressApp.use('/auth/google', this._googleRouter.router);
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
    private configPassports() {
        configGooglePassport();
        this._expressApp.use(cookieParser());
        this._expressApp.use(
            session({
                secret: 'some secret key',
                resave: false,
                saveUninitialized: false,
            })
        );
        this._expressApp.use(passport.initialize());
        this._expressApp.use(passport.session());
    }
}
