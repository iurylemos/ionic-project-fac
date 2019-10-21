import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private products = new Array<Product>();
  private productsSubscription: Subscription;

  constructor(
    private productsService: ProductService,
    private authService: AuthService
    ) {
    this.productsSubscription = this.productsService.getProducts().subscribe(data => {
      this.products = data;
      console.log(this.products)
    });
   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.productsSubscription.unsubscribe();
  }

  public async logout() {
    try {
      await this.authService.logout()
    }catch(error) {
      console.error(error)
    }
  }
}
