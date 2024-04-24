import { Router } from 'express';

export interface IBaseRouter {
    get router(): Router;
    initializeRoutes(): void;
}
