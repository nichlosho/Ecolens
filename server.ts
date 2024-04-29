import { environment } from 'environments/environment';
import { App } from 'src/App';

try {
    new App(environment.mongoDBConnection).expressApp.listen(
        environment.backendPort
    );
    console.log(
        '------------- Server is listing on port:' +
            environment.backendPort +
            ' -----------------------------'
    );
} catch (error) {
    console.error(
        '🛑 ------ !!!!!!!! Database connection failed',
        error + ' !!!!!!!! ------ 🛑'
    );
    process.exit();
}
