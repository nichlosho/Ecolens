import { Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser';
import { BaseModel } from './BaseModel';

export class UserModel extends BaseModel<IUser> {
    // ---------------------------------- Public Override Interfaces ----------------------------------//
    public override get collectionName(): string {
        return 'Users';
    }
    public override getSchema(): Schema<IUser> {
        return new Schema<IUser>(
            {
                firstName: String,
                lastName: String,
                email: String,
                phone: String,
                ssoId: String,
                photo: String,
                creditCard: String,
                address: {
                    street: String,
                    city: String,
                    state: String,
                    postalCode: String,
                    country: String,
                },
                cartItems: [{ itemId: String }],
            },
            { collection: this.collectionName }
        );
    }

    // ---------------------------------- Public Interfaces ----------------------------------//
}
