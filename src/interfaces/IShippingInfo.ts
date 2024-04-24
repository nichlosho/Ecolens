import { ObjectId } from 'mongoose';

export interface IShippingInfo {
    id?: ObjectId;
    customerId?: ObjectId;
    shippingAddress: string;
    deliveryDate?: Date;
}
