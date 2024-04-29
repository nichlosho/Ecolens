import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable()
export class OrderService extends BaseService {
    private static readonly endpoint = `/orders`;

    constructor(private http: HttpClient) {
        super();
    }
    public static async getOrders() {}
    public static async placeOrder() {}
}
