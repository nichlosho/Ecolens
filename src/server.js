"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var app_1 = require("./app");
dotenv.config();
var port = process.env.BACKEND_PORT || 8080;
var mongoDbString = process.env.MONGODB_CONNECTION_URL || '';
var app = new app_1.App(mongoDbString);
app.expressApp.listen(port);
console.log('------------- Server is listening on port:' +
    port +
    ' -----------------------------');
