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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
var mongoose_1 = require("mongoose");
var collectionFilter_1 = require("../helper/collectionFilter");
var ProductModel_1 = require("../models/ProductModel");
var baseModel_router_1 = require("./baseModel.router");
var ProductRouter = /** @class */ (function (_super) {
    __extends(ProductRouter, _super);
    function ProductRouter(mongoDBConnection) {
        var _this = _super.call(this) || this;
        _this.model = new ProductModel_1.ProductModel(mongoDBConnection);
        return _this;
    }
    ProductRouter.prototype.initializeRoutes = function () {
        // ----------------------------------- GET -----------------------------------\\
        var _this = this;
        // localhost:3000/products
        // localhost:3000/products?category=eyeglasses&material=wood
        this.router.get('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, category, material, filter, products, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, category = _a.category, material = _a.material;
                        filter = {};
                        if (category) {
                            filter = (0, collectionFilter_1.createCaseInsensitiveFilter)(filter, 'category', category);
                        }
                        if (material) {
                            filter = (0, collectionFilter_1.createCaseInsensitiveFilter)(filter, 'glassesInfo.material', material);
                        }
                        return [4 /*yield*/, this.model.find(filter)];
                    case 1:
                        products = _b.sent();
                        res.json(products);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.error('Error fetching products:', error_1);
                        res.status(500).json({ error: 'Internal Server Error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        // localhost:3000/products/1
        this.router.get('/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var productId, product, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productId = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.model.findById(productId)];
                    case 2:
                        product = _a.sent();
                        if (!product) {
                            res.status(404).json({ error: 'Product not found' });
                        }
                        else {
                            res.json(product);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error('Error fetching product:', error_2);
                        res.status(500).json({ error: 'Internal Server Error' });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        // ----------------------------------- POST -----------------------------------\\
        this.router.post('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var newProduct, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newProduct = req.body;
                        return [4 /*yield*/, this.model.insertMany(newProduct)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            res.status(201).send("Successfully created a new product with result ".concat(result));
                        }
                        else {
                            res.status(500).send('Failed to create new product');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error(error_3);
                        res.status(400).send(error_3.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        // ----------------------------------- PUT -----------------------------------\\
        this.router.put('/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, updatedProduct, query, updateItem, result, error_4;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a['id'];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        updatedProduct = req.body;
                        query = { _id: new mongoose_1.default.Types.ObjectId(id) };
                        updateItem = {
                            $set: updatedProduct,
                        };
                        return [4 /*yield*/, this.model.update(query, updateItem)];
                    case 2:
                        result = _b.sent();
                        result
                            ? res
                                .status(200)
                                .send("Successfully updated Product with id ".concat(id))
                            : res
                                .status(304)
                                .send("Product with id: ".concat(id, " not updated"));
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _b.sent();
                        console.error(error_4.message);
                        res.status(400).send(error_4.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        // ----------------------------------- DELETE -----------------------------------\\
        this.router.delete('/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, query, result, error_5;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a['id'];
                        query = {
                            _id: new mongoose_1.default.Types.ObjectId(id),
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.model.delete(query)];
                    case 2:
                        result = _b.sent();
                        if (result) {
                            res.status(202).send("Successfully removed Product with id ".concat(id));
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _b.sent();
                        console.error('Error deleting product:', error_5);
                        res.status(500).send('Internal Server Error');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    return ProductRouter;
}(baseModel_router_1.BaseModelRouter));
exports.ProductRouter = ProductRouter;
