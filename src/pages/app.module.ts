import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ProductService } from 'src/service/product.service';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
    declarations: [AppComponent, NavbarComponent],
    imports: [BrowserModule, RouterModule.forRoot(routes), HttpClientModule],
    providers: [ProductService],
    bootstrap: [AppComponent],
})
export class AppModule {}
