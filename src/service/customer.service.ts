import { Injectable } from '@angular/core';
import { ObjectId } from 'mongoose';
import { ICustomer } from '../interfaces/ICustomer';
import { BaseService } from './base.service';

@Injectable()
export class CustomerService extends BaseService {
    public override endpoint = `customer`;

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
