import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  private products = new Array<Product>();
  private productsSubscription: Subscription;
  private loading: any;
  public user: any = {};

  constructor(
    private productsService: ProductService,
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
    ) {
    this.productsSubscription = this.productsService.getProducts().subscribe(data => {
      this.products = data;
      console.log(this.products)
    });
    console.log(this.user)
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

  public async showAlert(product: any = {}) {

    if(!this.user.isAdmin) {
      return;
    }

    const alert = await this.alertController.create({
      header: product.id ? 'Atualizar produto' : 'Criar produto',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: product.name
        },
        {
          name: 'price',
          type: 'number',
          placeholder: 'Price',
          value: product.price
        },
        {
          name: 'picture',
          type: 'url',
          placeholder: 'Picture',
          value: product.picture
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, 
        {
          text: 'OK',
          handler: data => {
            if(product.id) {
              this.productsService.updateProduct(product.id, data);
            }else {
              this.productsService.addProduct(data);
            }
          }
        }
      ]
    });
    await alert.present()
  }
}