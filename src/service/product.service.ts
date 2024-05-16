import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { BaseService } from './base.service';

@Injectable()
export class ProductService extends BaseService {
    public override endpoint = `products`;

    public async getProductById(id: number): Promise<IProduct> {
        try {
            const url = `${this.fullUrl}/${id}`;
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
            const url = `${this.fullUrl}?material=${materialType}`;
            const response = await this.http.get<IProduct[]>(url).toPromise();
            return response;
        } catch (error) {
            console.error('Error fetching product materials:', error);
        }
    }
    public async getProductsByCategory(category: string): Promise<IProduct[]> {
        try {
            const url = `${this.fullUrl}?category=${category}`;
            const response = await this.http.get<IProduct[]>(url).toPromise();
            return response;
        } catch (error) {
            console.error('Error fetching product category:', error);
        }
    }

    public async getAllProducts(): Promise<IProduct[]> {
        try {
            const response = await this.http
                .get<IProduct[]>(`${this.fullUrl}`)
                .toPromise();
            return response;
        } catch (error) {
            return [];
        }
    }
}
