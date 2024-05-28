import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { BaseService } from '../service/base.service';
import { CartService } from '../service/cart.service';
import { OrderService } from '../service/order.service';
import { ProductService } from '../service/product.service';
import { SsoService } from '../service/sso.service';
import { UserService } from '../service/user.service';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileDialogComponent } from './components/profile-dialog/profile-dialog.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        CartComponent,
        ProductDetailsComponent,
        ProductsComponent,
        CheckoutComponent,
        NotFoundComponent,
        SignInComponent,
        ProfileDialogComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatMenuModule,
        MatDialogActions,
        MatDialogContent,
        FormsModule,
    ],
    providers: [
        BaseService,
        ProductService,
        CartService,
        UserService,
        OrderService,
        SsoService,
        provideAnimationsAsync(),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
