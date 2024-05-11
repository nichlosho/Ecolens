import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/interfaces/IProduct';
import { ProductService } from '../../service/product.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
    public items: IProduct[] = [];

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.productService
            .getAllProducts()
            .then((data) => {
                this.items = data;
            })
            .catch((error) => {
                console.error('Failed to fetch products', error);
                this.items = []; // Handling error by setting items to an empty array
            });
    }
}
