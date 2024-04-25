import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import GooglePassportObj from './GooglePassport';
import { CustomerRouter } from './routers/customer.router';
import { GoogleRouter } from './routers/google.router';
import { ProductRouter } from './routers/products.router';

// Creates and configures an ExpressJS web server.
export class App {
    public expressApp: express.Application;
    private _productRouter: ProductRouter;
    private _customerRouter: CustomerRouter;
    private _googleRouter: GoogleRouter;
    private _googlePassportObj: GooglePassportObj; // keep until google auth is setup

    constructor(mongoDBConnection: string) {
        //this.googlePassportObj = new GooglePassportObj();
        this.expressApp = express();
        this.middleware();
        this.initializeRouters(mongoDBConnection);
    }

    // Configure API endpoints.
    private initializeRouters(mongoDBConnection: string): void {
        const router = express.Router();

        // Product router
        this._productRouter = new ProductRouter(mongoDBConnection);
        router.use('/products', this._productRouter.router);

        // Customer router
        this._customerRouter = new CustomerRouter(mongoDBConnection);
        router.use('/customers', this._customerRouter.router);

        //Cart router

        //Checkout router

        // Google APIs
        this._googleRouter = new GoogleRouter();
        router.use('/auth/google', this._googleRouter.router);

        this.expressApp.use('/', router);

        // validateAuth examples

        // router.get(
        //     '/app/list/:listId/count',
        //     this.validateAuth,
        //     async (req, res) => {
        //         var id = req.params.listId;
        //         console.log('Query single list with id: ' + id);
        //         //await this.tasks.retrieveTasksCount(res, { listId: id });
        //     }
        // );

        // Crypto examples

        // router.post('/app/list2/', async (req, res) => {
        //     const id = crypto.randomBytes(16).toString('hex');
        //     console.log(req.body);
        //     var jsonObj = req.body;
        //     jsonObj.listId = id;
        //     //const doc = new this.lists.model(jsonObj);
        //     try {
        //         //await doc.save();
        //         res.send('{"id":"' + id + '"}');
        //     } catch (e) {
        //         console.log('object creation failed');
        //         console.error(e);
        //     }
        // });
    }
    // Configure Express middleware.
    private middleware(): void {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept'
            );
            next();
        });
        this.expressApp.use(
            session({
                secret: 'keyboard cat',
                resave: false,
                saveUninitialized: false,
            })
        );
        this.expressApp.use(cookieParser());
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    }

    private validateAuth(req, res, next): void {
        if (req.isAuthenticated()) {
            console.log('user is authenticated');
            console.log(JSON.stringify(req.user));
            return next();
        }
        console.log('user is not authenticated');
        res.redirect('/');
    }
}
