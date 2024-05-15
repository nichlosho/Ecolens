import * as dotenv from 'dotenv';
import { App } from './App';
import express = require('express');
import path = require('path');

dotenv.config();

const port = process.env.BACKEND_PORT || 3000;
const mongoDbString = process.env.MONGODB_CONNECTION_URL || '';
const app = new App(mongoDbString);
app.expressApp.use(
    express.static(path.join(__dirname, 'wwwroot', 'dist', 'ecolens'))
);
app.expressApp.listen(port);
console.log(
    '------------- Server is listening on port:' +
        port +
        ' -----------------------------'
);
