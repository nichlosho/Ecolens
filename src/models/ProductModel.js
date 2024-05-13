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
exports.ProductModel = void 0;
var mongoose_1 = require("mongoose");
var BaseModel_1 = require("./BaseModel");
var ProductModel = /** @class */ (function (_super) {
    __extends(ProductModel, _super);
    function ProductModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ProductModel.prototype, "collectionName", {
        // ---------------------------------- Public Override Interfaces ----------------------------------//
        get: function () {
            return 'Products';
        },
        enumerable: false,
        configurable: true
    });
    ProductModel.prototype.getSchema = function () {
        return new mongoose_1.Schema({
            name: String,
            description: String,
            price: Number,
            quantity: Number,
            inventoryStatus: String,
            category: String,
            glassesInfo: {
                material: String,
                prescriptionType: String,
                frameColor: String,
                lensColor: String,
            },
            image: String,
        }, { collection: this.collectionName });
    };
    return ProductModel;
}(BaseModel_1.BaseModel));
exports.ProductModel = ProductModel;
