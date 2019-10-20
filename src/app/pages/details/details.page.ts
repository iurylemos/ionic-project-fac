import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  private product : Product = {};
  private loading: any;
  private productId: string = null;
  private productSubscription: Subscription

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private authService: AuthService,
    private productService: ProductService,
    private activedRouter: ActivatedRoute,
    private navController: NavController
  ) { 
    this.productId = this.activedRouter.params['id'];

    if(this.productId) {
      this.loadProduct()
    }
  }

  ngOnInit() {
  }

  public async saveProduct() {
    await this.presentLoading();

    //Independente de está alterando ou criando vou validar
    //E para isso preciso do Id do usuário
    this.product.userId = this.authService.getAuth().currentUser.uid
    //Se o produto existir vou tentar atualizar o produto
    //Se não existir vou criar um produto novo
    if(this.productId) {

    }else {
      this.product.createdAt = new Date().getTime();

      try {
        await this.productService.addProduct(this.product)
        await this.loading.dismiss();

        //navcontroller com navBack para voltar a pagina anterior
        this.navController.navigateBack('/home');
      }catch(error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss()
      }
    }
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

  public loadProduct() {
    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data
    })
  }
}
