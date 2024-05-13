"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModel = void 0;
var mongodb_1 = require("mongodb");
var mongoose_1 = require("mongoose");
var BaseModel_1 = require("./BaseModel");
var CustomerModel = /** @class */ (function (_super) {
    __extends(CustomerModel, _super);
    function CustomerModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CustomerModel.prototype, "collectionName", {
        // ---------------------------------- Public Override Interfaces ----------------------------------//
        get: function () {
            return 'Customers';
        },
        enumerable: false,
        configurable: true
    });
    CustomerModel.prototype.getSchema = function () {
        return new mongoose_1.Schema({
            id: mongodb_1.ObjectId,
            firstName: String,
            lastName: String,
            email: String,
            phone: String,
            username: String,
            password: String,
            address: {
                street: String,
                city: String,
                state: String,
                postalCode: String,
                country: String,
            },
        }, { collection: this.collectionName });
    };
    return CustomerModel;
}(BaseModel_1.BaseModel));
exports.CustomerModel = CustomerModel;
