"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModelRouter = void 0;
var express = require("express");
var BaseModelRouter = /** @class */ (function () {
    function BaseModelRouter() {
        this.router = express.Router();
        this.initializeRoutes();
    }
    Object.defineProperty(BaseModelRouter.prototype, "router", {
        get: function () {
            return this._router;
        },
        set: function (value) {
            this._router = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseModelRouter.prototype, "model", {
        get: function () {
            return this._model;
        },
        set: function (value) {
            this._model = value;
        },
        enumerable: false,
        configurable: true
    });
    BaseModelRouter.prototype.initializeRoutes = function () { };
    return BaseModelRouter;
}());
exports.BaseModelRouter = BaseModelRouter;
