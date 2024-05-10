import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable()
export class OrderService extends BaseService {
    private static readonly endpoint = `/orders`;

    public static async getOrders() {}
    public static async placeOrder() {}
}
