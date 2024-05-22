import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import GooglePassportObj from './passports/GooglePassport';
import { GoogleRouter } from './routers/google.router';
import { ProductRouter } from './routers/products.router';
import { UserRouter } from './routers/user.router';
import express = require('express');
import cors = require('cors');
import cookieParser = require('cookie-parser');
import MongoStore = require('connect-mongo');
import session = require('express-session');

// Creates and configures an ExpressJS web server.
export class App {
    private _expressApp: express.Application;
    public get expressApp(): express.Application {
        return this._expressApp;
    }

    private _productRouter: ProductRouter;
    private _userRouter: UserRouter;
    private _googleRouter: GoogleRouter;
    private _googlePassportObj: GooglePassportObj;

    constructor(mongoDBConnectionUrl: string) {
        //this.googlePassportObj = new GooglePassportObj();
        this._expressApp = express();
        this.configExpressMiddleware();
        this.configSessionMiddleware(mongoDBConnectionUrl);
        this.initializeRouters(mongoDBConnectionUrl);
        this._expressApp.use(
            '/',
            express.static('/home/site/wwwroot/ecolens/index.html')
        );
    }

    // Configure API endpoints.
    private initializeRouters(mongoDBConnectionUrl: string): void {
        const router = express.Router();

        // Product router
        this._productRouter = new ProductRouter(mongoDBConnectionUrl);
        router.use('/products', this._productRouter.router);

        // User router
        this._userRouter = new UserRouter(mongoDBConnectionUrl);
        router.use('/user', this._userRouter.router);

        //Cart router

        //Checkout router

        // Google APIs
        this._googleRouter = new GoogleRouter();
        router.use('/auth/google', this._googleRouter.router);

        this._expressApp.use('/', router);
    }
    private configExpressMiddleware(): void {
        this._expressApp.use(bodyParser.json());
        this._expressApp.use(bodyParser.urlencoded({ extended: false }));
        this._expressApp.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept'
            );
            next();
        });

        this._expressApp.use(cors());
    }
    private configSessionMiddleware(mongoDBConnectionUrl: string) {
        this._googlePassportObj = new GooglePassportObj();
        this._expressApp.use(
            session({
                secret: 'keyboard cat',
                resave: false,
                saveUninitialized: true,
                cookie: {
                    maxAge: 60000 * 60 * 24, //1Sec * 1H * 24 = 1 Day
                    secure: Boolean(process.env.IS_PROD),
                },
                store: MongoStore.create({
                    mongoUrl: mongoDBConnectionUrl,
                    collectionName: 'Sessions',
                }),
            })
        );
        this._expressApp.use(cookieParser());
        this._expressApp.use(passport.initialize());
        this._expressApp.use(passport.session());
    }
}
