"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICategory = exports.IInventoryStatus = void 0;
var IInventoryStatus;
(function (IInventoryStatus) {
    IInventoryStatus["InStock"] = "In Stock";
    IInventoryStatus["OutOfStock"] = "Out of Stock";
    IInventoryStatus["LowStock"] = "Low Stock";
})(IInventoryStatus || (exports.IInventoryStatus = IInventoryStatus = {}));
var ICategory;
(function (ICategory) {
    ICategory["Eyeglasses"] = "Eyeglasses";
    ICategory["Sunglasses"] = "Sunglasses";
})(ICategory || (exports.ICategory = ICategory = {}));
