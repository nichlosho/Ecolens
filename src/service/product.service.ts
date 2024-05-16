import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBackendBaseUrl } from '../helper/backendUrl';
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
        materialType: string
    ): Promise<IProduct[]> {
        try {
            const url = `${this.baseUrl}/${this.endpoint}?material=${materialType}`;
            const response = await this.http.get<IProduct[]>(url).toPromise();
            return response;
        } catch (error) {
            console.error('Error fetching product materials:', error);
        }
    }
    public async getProductsByCategory(category: string): Promise<IProduct[]> {
        try {
            const url = `${this.baseUrl}/${this.endpoint}?category=${category}`;
            const response = await this.http.get<IProduct[]>(url).toPromise();
            return response;
        } catch (error) {
            console.error('Error fetching product category:', error);
        }
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
