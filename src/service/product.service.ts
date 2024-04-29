import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaterialType, PrescriptionType } from 'src/interfaces/IGlassesInfo';
import { IProduct } from 'src/interfaces/IProduct';
import { BaseService } from './base.service';

@Injectable()
export class ProductService extends BaseService {
    private static readonly endpoint = `/products`;

    constructor(private http: HttpClient) {
        super();
    }

    public static async getProductDetails() {
        return;
    }
    public static async getProductsByMaterialType(
        materialType: MaterialType
    ): Promise<IProduct[]> {
        console.log(materialType);
        return [];
    }
    public static async getProductsByPrescriptionType(
        prescriptionType: PrescriptionType
    ): Promise<IProduct[]> {
        console.log(prescriptionType);
        return [];
    }

    public static async getAllProducts(): Promise<IProduct[]> {
        const url = `${this.endpoint}`;
        try {
            const response = await ProductService.fetchData<IProduct[]>(url);
            return response;
        } catch (error) {
            return [];
        }
    }
}
