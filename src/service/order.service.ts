import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { IService } from 'src/interfaces/IService';

@Injectable()
export class OrderService implements IService {
    public readonly baseUrl = environment.baseUrl + environment.backendPort;
    public readonly endpoint = `/orders`;

    constructor(private http: HttpClient) {}

    public static async getOrders() {}
    public static async placeOrder() {}
}
