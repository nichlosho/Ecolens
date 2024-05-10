import { Injectable } from '@angular/core';
import { MaterialType, PrescriptionType } from 'src/interfaces/IGlassesInfo';
import { IProduct } from 'src/interfaces/IProduct';
import { BaseService } from './base.service';

@Injectable()
export class ProductService extends BaseService {
    private readonly endpoint = `products`;

    public async getProductDetails() {
        return;
    }
    public async getProductsByMaterialType(
        materialType: MaterialType
    ): Promise<IProduct[]> {
        console.log(materialType);
        return [];
    }
    public async getProductsByPrescriptionType(
        prescriptionType: PrescriptionType
    ): Promise<IProduct[]> {
        console.log(prescriptionType);
        return [];
    }

    public async getAllProducts(): Promise<IProduct[]> {
        const url = `${this.endpoint}`;
        try {
            const response = await this.get<IProduct[]>(url);
            return response;
        } catch (error) {
            return [];
        }
    }
}
