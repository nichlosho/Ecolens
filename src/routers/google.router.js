"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleRouter = void 0;
var express = require("express");
var passport_1 = require("passport");
var GoogleRouter = /** @class */ (function () {
    function GoogleRouter() {
        this.router = express.Router();
        this.initializeRoutes();
    }
    Object.defineProperty(GoogleRouter.prototype, "router", {
        get: function () {
            return this._router;
        },
        set: function (value) {
            this._router = value;
        },
        enumerable: false,
        configurable: true
    });
    GoogleRouter.prototype.initializeRoutes = function () {
        // ----------------------------------- GET -----------------------------------\\
        this._router.get('/', passport_1.default.authenticate('google', { scope: ['profile'] }));
        this._router.get('/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), function (req, res) {
            console.log('successfully authenticated user and returned to callback page.');
            console.log('redirecting to /#/list');
            res.redirect('/#/list');
        });
    };
    return GoogleRouter;
}());
exports.GoogleRouter = GoogleRouter;
