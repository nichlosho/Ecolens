import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../interfaces/IProduct';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct | null = null; // Use a plain object to store the product details

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      const productId = +params['id'];  // Convert string parameter to a number
      if (productId) {
        try {
          this.product = await this.productService.getProductDetails(productId);
        } catch (error) {
          console.error('Failed to fetch product details', error);
          this.product = null; // Handle the error by setting product to null
        }
      }
    });
  }
}
