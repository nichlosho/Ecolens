import { IAddress } from './IAddress';

export interface IUser {
    ssoId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: IAddress;
    cartItems: string[];
}
