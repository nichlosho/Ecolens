import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart } from 'src/interfaces/ICart';
import { BaseService } from './base.service';

@Injectable()
export class CartService extends BaseService {
    private static readonly endpoint = `/cart`;

    private static _cart: ICart;
    constructor(private http: HttpClient) {
        super();
        // use browser cache to store cart items
    }

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
