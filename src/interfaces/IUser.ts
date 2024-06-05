import mongoose from 'mongoose';
import { IAddress } from './IAddress';
import { IProduct } from './IProduct';

export interface IUser {
    _id?: mongoose.Types.ObjectId;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: IAddress;
    ssoId: string;
    cartItems: IProduct[];
    photo: string;
    creditCard: string;
}
