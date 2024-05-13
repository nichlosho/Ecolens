import { Schema } from 'mongoose';
import { IProduct } from '../interfaces/IProduct';
import { BaseModel } from './BaseModel';

export class ProductModel extends BaseModel<IProduct> {
    // ---------------------------------- Public Override Interfaces ----------------------------------//
    public override get collectionName(): string {
        return 'Products';
    }
    public override getSchema(): Schema<IProduct> {
        return new Schema<IProduct>(
            {
                name: String,
                description: String,
                price: Number,
                quantity: Number,
                inventoryStatus: String,
                category: String,
                glassesInfo: {
                    material: String,
                    prescriptionType: String,
                    frameColor: String,
                    lensColor: String,
                },
                image: String,
            },
            { collection: this.collectionName }
        );
    }

    // ---------------------------------- Public Interfaces ----------------------------------//
}
