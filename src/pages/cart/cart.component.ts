import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/IProduct';
import { IUser } from '../../interfaces/IUser';
import { ProductService } from '../../service/product.service';
import { SsoService } from '../../service/sso.service';
import { UserService } from '../../service/user.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
    public cart: IProduct[] = [];
    public user: IUser;

    constructor(
        private ssoService: SsoService,
        private userService: UserService,
        private productService: ProductService
    ) {}
    ngOnInit(): void {
        try {
            this.ssoService.getGoogleUser().then((res: IUser) => {
                const loggedInUser = res;
                this.userService
                    .getUserBySsoId(loggedInUser.ssoId)
                    .then((user) => {
                        this.user = user[0];
                        for (var product of this.user.cartItems) {
                            this.productService
                                .getProductById(product._id.toString())
                                .then((item) => {
                                    console.log(item);
                                    this.cart.push(item);
                                });
                        }
                    });
            });
        } catch (err) {
            // do nothing
        }
    }
}
