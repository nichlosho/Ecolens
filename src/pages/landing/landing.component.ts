import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/service/product.service';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [],
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
    ngOnInit(): void {
        ProductService.getAllProducts().then((value) => {
            console.log(value);
        });
    }
}
