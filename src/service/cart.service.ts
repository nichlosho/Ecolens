import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ICart } from 'src/interfaces/ICart';
import { IService } from 'src/interfaces/IService';

@Injectable()
export class CartService implements IService {
    public readonly baseUrl = environment.baseUrl + environment.backendPort;
    public readonly endpoint = `/cart`;

    constructor(private http: HttpClient) {}

    private static _cart: ICart;

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
