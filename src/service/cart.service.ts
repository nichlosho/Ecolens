import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBackendBaseUrl } from '../helper/backendUrl';
import { ICart } from '../interfaces/ICart';
import { IService } from '../interfaces/IService';

@Injectable()
export class CartService implements IService {
    private static _cart: ICart;
    public readonly baseUrl = getBackendBaseUrl();
    public readonly endpoint = `cart`;

    constructor(private http: HttpClient) {}

    // don't store in database, instead use browser cache

    // public addToCart(product: Product): void {
    //     this.cart.addItem(product);
    // }

    // public removeFromCart(productId: ObjectId): void {
    //     this.cart.removeItem(productId);
    // }

    // public clearCart(): void {
    //     this.cart.clearCart();
    // }

    // public getCartItems(): Product[] {
    //     return this.cart.items;
    // }

    // public getTotalPrice(): number {
    //     return this.cart.getTotalPrice();
    // }
}
