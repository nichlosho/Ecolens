import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBackendBaseUrl } from '../helper/backendUrl';
import { IService } from '../interfaces/IService';

@Injectable()
export class OrderService implements IService {
    public readonly baseUrl = getBackendBaseUrl();
    public readonly endpoint = `orders`;

    constructor(private http: HttpClient) {}

    public static async getOrders() {}
    public static async placeOrder() {}
}
