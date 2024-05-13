import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectId } from 'mongoose';
import { environment } from '../../environments/environment';
import { ICustomer } from '../interfaces/ICustomer';
import { IService } from '../interfaces/IService';

@Injectable()
export class CustomerService implements IService {
    public readonly baseUrl = environment.baseUrl + environment.backendPort;
    public readonly endpoint = `/customer`;

    constructor(private http: HttpClient) {}

    private static readonly endpoint = `/customers`;

    public static async addCustomer(customer: ICustomer): Promise<void> {
        console.log(customer);
    }
    public static async getCustomerById(
        customerId: ObjectId
    ): Promise<ICustomer | undefined> {
        console.log(customerId);
        return undefined;
    }
}
