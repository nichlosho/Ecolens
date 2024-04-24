import { Schema } from 'mongoose';
import { IProduct } from 'src/interfaces/IProduct';
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
                    frameMaterial: String,
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
