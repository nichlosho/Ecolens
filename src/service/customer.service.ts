import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ObjectId } from 'mongodb';
import { ICustomer } from 'src/interfaces/ICustomer';
import { IService } from 'src/interfaces/IService';

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
