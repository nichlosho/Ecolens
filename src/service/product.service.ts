import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { BaseService } from './base.service';

@Injectable()
export class ProductService extends BaseService {
    public override endpoint = `products`;

    public async getProductById(id: string): Promise<IProduct> {
        try {
            const url = `${this.fullUrl}/${id}`;
            const response = await this.http.get<IProduct>(url).toPromise();
            return response;
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }

    public async deleteProductById(id: number): Promise<void> {
        try {
            const url = `${this.fullUrl}/${id}`;
            await this.http.delete<void>(url).toPromise();
            console.log(`Product with id ${id} was deleted.`);
        } catch (error) {
            console.error(`Error deleting product with id ${id}:`, error);
            throw error; // Rethrow to handle it in the caller if necessary
        }
    }

    public async createProducts(products: IProduct[]): Promise<IProduct[]> {
        try {
            const response = await this.http
                .post<IProduct[]>(`${this.fullUrl}`, products)
                .toPromise();
            return response;
        } catch (error) {
            console.error('Error creating products:', error);
            throw error;
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
