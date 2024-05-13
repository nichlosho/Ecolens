"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var bodyParser = require("body-parser");
var customer_router_1 = require("./routers/customer.router");
var products_router_1 = require("./routers/products.router");
var express = require("express");
var cors = require("cors");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //private _googleRouter: GoogleRouter;
    //private _googlePassportObj: GooglePassportObj; // keep until google auth is setup
    function App(mongoDBConnection) {
        //this.googlePassportObj = new GooglePassportObj();
        this.expressApp = express();
        this.expressApp.use(cors());
        this.configExpressMiddleware();
        this.initializeRouters(mongoDBConnection);
        this.expressApp.use('/', express.static(__dirname + '/dist'));
    }
    // Configure API endpoints.
    App.prototype.initializeRouters = function (mongoDBConnection) {
        var router = express.Router();
        // Product router
        this._productRouter = new products_router_1.ProductRouter(mongoDBConnection);
        router.use('/products', this._productRouter.router);
        // Customer router
        this._customerRouter = new customer_router_1.CustomerRouter(mongoDBConnection);
        router.use('/customers', this._customerRouter.router);
        //Cart router
        //Checkout router
        // Google APIs
        // this._googleRouter = new GoogleRouter();
        // router.use('/auth/google', this._googleRouter.router);
        this.expressApp.use('/', router);
    };
    App.prototype.configExpressMiddleware = function () {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
    };
    App.prototype.validateAuth = function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log('user is authenticated');
            console.log(JSON.stringify(req.user));
            return next();
        }
        console.log('user is not authenticated');
        res.redirect('/');
    };
    return App;
}());
exports.App = App;
