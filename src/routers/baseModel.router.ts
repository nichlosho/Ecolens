import express, { Router } from 'express';
import { IBaseRouter } from 'src/interfaces/IRouter';
import { BaseModel } from 'src/models/BaseModel';

export abstract class BaseModelRouter<T extends any> implements IBaseRouter {
    private _router: Router;
    public get router(): Router {
        return this._router;
    }
    private set router(value: Router) {
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
