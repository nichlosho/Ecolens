import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectId } from 'mongoose';
import { getBackendBaseUrl } from '../helper/backendUrl';
import { ICustomer } from '../interfaces/ICustomer';
import { IService } from '../interfaces/IService';

@Injectable()
export class CustomerService implements IService {
    public readonly baseUrl = getBackendBaseUrl();
    public readonly endpoint = `customer`;

    constructor(private http: HttpClient) {}

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
