import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductService } from 'src/service/product.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent, NavbarComponent],
    imports: [BrowserModule, RouterModule.forRoot(routes), HttpClientModule],
    providers: [ProductService],
    bootstrap: [AppComponent],
})
export class AppModule {}
