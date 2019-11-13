import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Oferta } from 'src/app/shared/Oferta.model';
import { OrdemCompraService } from 'src/app/services/ordem-compra.service';
import { Produto } from 'src/app/shared/produto.model';
import { OfertasService } from 'src/app/services/ofertas.service';
import { ParamsService } from 'src/app/services/params.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  private products = new Array<Product>();
  private productsSubscription: Subscription;
  private produtosSubscription: any;
  private loading: any;
  public user: any = {};
  public dadosUser: Array<any>
  public carrinhoClient: Array<any>

  constructor(
    private productsService: ProductService,
    private ofertasService: OfertasService,
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private fireAuth: AngularFireAuth,
    private paramService: ParamsService
  ) {
    this.productsSubscription = this.productsService.getProducts().subscribe(data => {
      this.products = data;
      console.log('PRODUTOS DO FIREBASE: ',this.products)
    });
    
    this.ofertasService.getOfertas().then(data => {
      console.log('PRODUTOS DO MEU BD: ', data)
    })
    this.dataUser()
  }

  public async dataUser() {
    this.authService.getUsers().subscribe(data => {
      this.dadosUser = data.filter((data) => data.email === this.fireAuth.auth.currentUser.email)
      console.log('DADOS DO USUÁRIO: ', this.dadosUser)

      for (let index = 0; index < this.dadosUser.length; index++) {
        const element = this.dadosUser[index];
      
        this.ofertasService.getCarrinhoPorEmail(element.email).then((dados) => {
          this.carrinhoClient = dados
          console.log(this.carrinhoClient)
          this.paramService.setCarrinhoCliente(this.carrinhoClient)
        })
      }
    })
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
    } catch (error) {
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

  dataProduct(product: any) {
    console.log(product)
  }

  public async showAlert(product: any = {}) {

    console.log(product)

    if (!this.user.isAdmin) {
      return;
    }

    const alert = await this.alertController.create({
      header: product._id ? 'Atualizar produto' : 'Criar produto',
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
            if (product.id) {
              this.productsService.updateProduct(product.id, data);
            } else {
              this.productsService.addProduct(data);
            }
          }
        }
      ]
    });
    await alert.present()
  }
}
