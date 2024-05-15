import * as bodyParser from 'body-parser';
import { CustomerRouter } from './routers/customer.router';
import { ProductRouter } from './routers/products.router';
import express = require('express');
import cors = require('cors');
import path = require('path');

// Creates and configures an ExpressJS web server.
export class App {
    public expressApp: express.Application;
    private _productRouter: ProductRouter;
    private _customerRouter: CustomerRouter;
    //private _googleRouter: GoogleRouter;
    //private _googlePassportObj: GooglePassportObj; // keep until google auth is setup

    constructor(mongoDBConnection: string) {
        //this.googlePassportObj = new GooglePassportObj();
        this.expressApp = express();
        this.expressApp.use(cors());
        this.configExpressMiddleware();
        this.initializeRouters(mongoDBConnection);
        this.expressApp.use('/', express.static(__dirname + '/dist/ecolens'));
        // Wildcard Route catch all get
        this.expressApp.get('/*', (req, res) => {
            res.sendFile(path.join(__dirname, '/dist/ecolens/index.html'));
        });
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
        // this._googleRouter = new GoogleRouter();
        // router.use('/auth/google', this._googleRouter.router);

        this.expressApp.use('/', router);
    }
    private configExpressMiddleware(): void {
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
