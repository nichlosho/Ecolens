import * as express from 'express';
import { IBaseRouter } from '../interfaces/IRouter';
import { BaseModel } from '../models/BaseModel';

export abstract class BaseModelRouter<T> implements IBaseRouter {
    private _router: express.Router;
    public get router(): express.Router {
        return this._router;
    }
    private set router(value: express.Router) {
        this._router = value;
    }

    private _model: BaseModel<T>;
    public get model(): BaseModel<T> {
        return this._model;
    }
    protected set model(value: BaseModel<T>) {
        this._model = value;
    }

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    public initializeRoutes(): void {}
}
