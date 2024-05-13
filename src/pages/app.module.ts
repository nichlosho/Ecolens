import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { ProductService } from '../service/product.service';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
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
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
    ],
    providers: [ProductService, provideAnimationsAsync()],
    bootstrap: [AppComponent],
})
export class AppModule {}
