import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../interfaces/IProduct';
import { ProductService } from '../../service/product.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
    public product: IProduct | null = null;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute
    ) {}

    @Output() cartUpdated = new EventEmitter<{
      product: Promise<IProduct>
    }>();

    ngOnInit(): void {
        this.route.queryParams.subscribe(async (params) => {
            const id = params['id'];
            if (!id) {
                return;
            }
            try {
                this.product = await this.productService.getProductById(id);
            } catch (error) {
                console.error('Failed to fetch product details', error);
            }
        });
    }

    onCartUpdated(event) {
      const id = event.target.getAttribute('id');
      this.cartUpdated.emit({
        product: this.productService.getProductById(id)
      });
    }
}
