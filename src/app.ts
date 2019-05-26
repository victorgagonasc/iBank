import * as express from 'express';
import * as logger from 'morgan';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import routes from './routes/index';

class App {
    public app: express.Application;
    public port: number;

    constructor() {
        this.app = express();

        this.initializeMiddlewares();
        this.app.use('/', routes);
    }

    private initializeMiddlewares() {
        this.app.use(logger('dev'));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

export default new App().app;