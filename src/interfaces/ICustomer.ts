import mongoose from 'mongoose';
import { IAddress } from './IAddress';

export interface ICustomer {
    id?: mongoose.ObjectId;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    username?: string;
    password?: string;
    address?: IAddress;
}
