import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { MaterialType, PrescriptionType } from 'src/interfaces/IGlassesInfo';
import { IProduct } from 'src/interfaces/IProduct';
import { IService } from 'src/interfaces/IService';

@Injectable()
export class ProductService implements IService {
    public readonly baseUrl = environment.baseUrl + environment.backendPort;
    public readonly endpoint = `products`;

    constructor(private http: HttpClient) {}

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
        try {
            const response = await this.http
                .get<IProduct[]>(`${this.baseUrl}/${this.endpoint}`)
                .toPromise();
            return response;
        } catch (error) {
            return [];
        }
    }
}
