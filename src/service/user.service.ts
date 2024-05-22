import { Injectable } from '@angular/core';
import { ObjectId } from 'mongoose';
import { IUser } from '../interfaces/IUser';
import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService {
    public override endpoint = `customer`;

    public static async addCustomer(customer: IUser): Promise<void> {
        console.log(customer);
    }
    public static async getCustomerById(
        customerId: ObjectId
    ): Promise<IUser | undefined> {
        console.log(customerId);
        return undefined;
    }
}
