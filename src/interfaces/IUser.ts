import mongoose from 'mongoose';
import { IAddress } from './IAddress';

export interface IUser {
    _id?: mongoose.Types.ObjectId;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: IAddress;
    ssoId: string;
    cartItems: string[];
    photo: string;
    creditCard: string;
}
