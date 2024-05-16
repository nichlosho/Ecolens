import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../interfaces/IProduct';
import { ProductService } from '../../service/product.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
    public products: IProduct[] = [];

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(async (params) => {
            try {
                const material = params['material'];
                this.products = material
                    ? await this.productService.getProductsByMaterialType(
                          material
                      )
                    : await this.productService.getAllProducts();
            } catch (error) {
                console.error('Failed to fetch product by material', error);
                this.products = [];
            }
        });
    }
}
