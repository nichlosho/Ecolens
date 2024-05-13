"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCaseInsensitiveFilter = void 0;
// Helper function to generate case-insensitive filter for documents
function createCaseInsensitiveFilter(filter, propertyName, propertyValue) {
    filter[propertyName] = { $regex: new RegExp(propertyValue, 'i') };
    return filter;
}
exports.createCaseInsensitiveFilter = createCaseInsensitiveFilter;
