import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectId } from 'mongodb';
import { ICustomer } from 'src/interfaces/ICustomer';
import { BaseService } from './base.service';

@Injectable()
export class CustomerService extends BaseService {
    private static readonly endpoint = `/customers`;

    constructor(private http: HttpClient) {
        super();
    }

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
