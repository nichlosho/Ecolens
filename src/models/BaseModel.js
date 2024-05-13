"use strict";
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
exports.BaseModel = void 0;
var mongoose_1 = require("mongoose");
var BaseModel = /** @class */ (function () {
    function BaseModel(dbConnectionString) {
        this.dbConnectionString = dbConnectionString;
        this.createModel();
    }
    Object.defineProperty(BaseModel.prototype, "dbName", {
        get: function () {
            return 'Ecolens';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseModel.prototype, "collectionName", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    BaseModel.prototype.getSchema = function () {
        return null;
    };
    BaseModel.prototype.createModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, mongoose_1.default.connect(this.dbConnectionString)];
                    case 1:
                        _a.sent();
                        this.model = mongoose_1.default.model(this.collectionName, this.getSchema());
                        console.log('✅----------- Connection Successful for ' +
                            this.collectionName +
                            ' Collection -----------✅');
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ---------------------------------- Public Interfaces ----------------------------------//
    // ----------------------------------- GET -----------------------------------\\
    BaseModel.prototype.find = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var query, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.find(filter);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BaseModel.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, item, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.findById(id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        item = _a.sent();
                        return [2 /*return*/, item];
                    case 3:
                        e_3 = _a.sent();
                        console.error(e_3);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // ----------------------------------- POST -----------------------------------\\
    BaseModel.prototype.insertMany = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.insertMany(Array.isArray(item) ? item : [item])];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_4 = _a.sent();
                        console.error(e_4);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ----------------------------------- PUT -----------------------------------\\
    BaseModel.prototype.update = function (filter, updateItem) {
        return __awaiter(this, void 0, void 0, function () {
            var query, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.findOneAndUpdate(filter, updateItem, {
                            new: true,
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        e_5 = _a.sent();
                        console.error(e_5);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // ----------------------------------- DELETE -----------------------------------\\
    BaseModel.prototype.delete = function (objectId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.findOneAndDelete(objectId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        e_6 = _a.sent();
                        console.error(e_6);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return BaseModel;
}());
exports.BaseModel = BaseModel;
