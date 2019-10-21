import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private products = new Array<Product>();
  private productsSubscription: Subscription;
  private loading: any;

  constructor(
    private productsService: ProductService,
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController,
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

  //Método que copiei da documentação: https://ionicframework.com/docs/api/loading
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }

  public async logout() {
    try {
      await this.authService.logout()
    }catch(error) {
      console.error(error)
    }
  }

  public async deleteProduct(id: string) {
    try {
      await this.productsService.deleteProduct(id)
    } catch (error) {
      this.presentToast('Erro ao tentar salvar');
    }
  }
}
