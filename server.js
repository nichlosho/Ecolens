"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var express = require("express");
var path_1 = require("path");
var App_1 = require("./src/App");
dotenv.config();
try {
    //const __dirname = path.resolve();
    var app = new App_1.App(process.env.MONGODB_CONNECTION_URL);
    app.expressApp.listen(process.env.BACKEND_PORT || 3000);
    console.log('------------- Server is listening on port:' +
        process.env.BACKEND_PORT +
        ' -----------------------------');
    // const distPath = path.join(__dirname, './dist/Ecolens');
    // app.expressApp.use(express.static(distPath));
    // app.expressApp.get('/*', (req, res) => {
    //     res.sendFile('index.html', { root: distPath });
    // });
    app.expressApp.use(express.static('./dist/Ecolens'));
    app.expressApp.get('*', function (req, res) {
        res.sendFile(path_1.default.resolve(__dirname, 'dist', 'Ecolens', 'index.html'));
    });
}
catch (error) {
    console.error('🛑 ------ !!!!!!!! Database connection failed', error + ' !!!!!!!! ------ 🛑');
    process.exit();
}
