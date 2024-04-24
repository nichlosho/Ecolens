import mongoose from 'mongoose';
import { IGlassesInfo } from './IGlassesInfo';

export enum IInventoryStatus {
    InStock = 'In Stock',
    OutOfStock = 'Out of Stock',
    LowStock = 'Low Stock',
}
export enum ICategory {
    Eyeglasses = 'Eyeglasses',
    Sunglasses = 'Sunglasses',
}

export interface IProduct {
    id?: mongoose.Types.ObjectId;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: IInventoryStatus;
    category?: ICategory;
    glassesInfo?: IGlassesInfo;
    image?: string;
}
