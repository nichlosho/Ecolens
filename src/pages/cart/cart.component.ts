import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/interfaces/IProduct';
import { ProductService } from 'src/service/product.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
    public cart: IProduct[] = [];

    constructor(private productService: ProductService) {}
    ngOnInit(): void {
        this.productService.getAllProducts().then((res) => {
            this.cart = res;
        });
    }
}
