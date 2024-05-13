import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';
import { ICustomer } from '../interfaces/ICustomer';
import { BaseModel } from './BaseModel';

export class CustomerModel extends BaseModel<ICustomer> {
    // ---------------------------------- Public Override Interfaces ----------------------------------//
    public override get collectionName(): string {
        return 'Customers';
    }
    public override getSchema(): Schema<ICustomer> {
        return new Schema<ICustomer>(
            {
                id: ObjectId,
                firstName: String,
                lastName: String,
                email: String,
                phone: String,
                username: String,
                password: String,
                address: {
                    street: String,
                    city: String,
                    state: String,
                    postalCode: String,
                    country: String,
                },
            },
            { collection: this.collectionName }
        );
    }

    // ---------------------------------- Public Interfaces ----------------------------------//
}
