import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBackendBaseUrl } from '../helper/backendUrl';
import { MaterialType, PrescriptionType } from '../interfaces/IGlassesInfo';
import { IProduct } from '../interfaces/IProduct';
import { IService } from '../interfaces/IService';

@Injectable()
export class ProductService implements IService {
    public readonly baseUrl = getBackendBaseUrl();
    public readonly endpoint = `products`;

    constructor(private http: HttpClient) {}

    public async getProductById(id: number): Promise<IProduct> {
        try {
            const url = `${this.baseUrl}/${this.endpoint}/${id}`;
            const response = await this.http.get<IProduct>(url).toPromise();
            return response;
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
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
        try {
            const response = await this.http
                .get<IProduct[]>(`${this.baseUrl}${this.endpoint}`)
                .toPromise();
            return response;
        } catch (error) {
            return [];
        }
    }
}
