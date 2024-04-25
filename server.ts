import dotenv from 'dotenv';
import { App } from 'src/App';
dotenv.config();

const port = process.env.BACKEND_PORT || 3000;
const mongoDBConnection = process.env.MongoDbConnectionString;

try {
    new App(mongoDBConnection).expressApp.listen(port);
    console.log(
        '------------- Server is listing on port:' +
            port +
            ' -----------------------------'
    );
} catch (error) {
    console.error(
        '🛑 ------ !!!!!!!! Database connection failed',
        error + ' !!!!!!!! ------ 🛑'
    );
    process.exit();
}
