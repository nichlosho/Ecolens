import * as dotenv from 'dotenv';
import * as express from 'express';
import path from 'path';
import { App } from './src/App';

dotenv.config();

try {
    //const __dirname = path.resolve();
    const app = new App(process.env.MONGODB_CONNECTION_URL);
    app.expressApp.listen(process.env.BACKEND_PORT || 8080);
    console.log(
        '------------- Server is listening on port:' +
            process.env.BACKEND_PORT +
            ' -----------------------------'
    );

    // const distPath = path.join(__dirname, './dist/Ecolens');
    // app.expressApp.use(express.static(distPath));
    // app.expressApp.get('/*', (req, res) => {
    //     res.sendFile('index.html', { root: distPath });
    // });
    app.expressApp.use(express.static('./dist/Ecolens'));
    app.expressApp.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'dist', 'Ecolens', 'index.html'));
    });
} catch (error) {
    console.error(
        '🛑 ------ !!!!!!!! Database connection failed',
        error + ' !!!!!!!! ------ 🛑'
    );
    process.exit();
}
