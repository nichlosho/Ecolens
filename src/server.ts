import * as dotenv from 'dotenv';
import { App } from './App';

dotenv.config();

const port = process.env.BACKEND_PORT || 3000;
const mongoDbString = process.env.MONGODB_CONNECTION_URL || '';
const app = new App(mongoDbString);
app.expressApp.listen(port);
console.log(
    '------------- Server is listening on port:' +
        port +
        ' -----------------------------'
);
