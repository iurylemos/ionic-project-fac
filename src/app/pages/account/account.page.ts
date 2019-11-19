import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, AlertController, ModalController } from '@ionic/angular';
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
import { Router, ActivatedRoute } from '@angular/router';
import { ModalCarrinhoPage } from './modal-carrinho/modal-carrinho.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  private products = new Array<Oferta>();
  private productsSubscription: Subscription;
  private produtosCadastrados: boolean = false;
  private produtosAdmin: Array<any> = []
  private loading: any;
  public user: any = {};
  public dadosUser: Array<any> = []
  public carrinhoClient: Array<any> = []
  public filterPedidos: Array<any> = []
  public userData: string
  public userAdmin: boolean

  constructor(
    private productsService: ProductService,
    private ofertasService: OfertasService,
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private fireAuth: AngularFireAuth,
    private paramService: ParamsService,
    private ordemCompraService: OrdemCompraService,
    private router: Router,
    private _route: ActivatedRoute,
    private modalController: ModalController
  ) {
    // this.productsSubscription = this.productsService.getProducts().subscribe(data => {
    //   // this.products = data;
    //   console.log('PRODUTOS DO FIREBASE: ', this.products)
    // });

    // this.ofertasService.todasOfertas().subscribe((data) => {
    //   this.products = data;
    // })

    // this.ofertasService.getOfertas().then(data => {
    //   console.log('PRODUTOS DO MEU BD: ', data)
    //   this.products = data;
    // })

    console.log('ROTA: ', this.router.getCurrentNavigation())

    // if (this.router.getCurrentNavigation().extras.state) {
    //   console.log('Entrou no router')
    //   this.dataUser()
    // }

    this._route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.dataUser()
      }
    });

    



    this.dataUser()
  }



  public async dataUser() {
    this.presentLoading()
    this.authService.getUsers().subscribe(data => {

      console.log(data)
      this.dadosUser = data.filter((data) => data.email === this.fireAuth.auth.currentUser.email)
      console.log('DADOS DO USUÁRIO: ', this.dadosUser)

      for (let index = 0; index < this.dadosUser.length; index++) {
        const element = this.dadosUser[index];
        this.userData = element.email
        this.userAdmin = element.isAdmin
      }

      console.log('EMAIL USUÁRIO: ', this.userData)


      if(this.userAdmin === true) {
        this.ofertasService.getCarrinhosPorAdmin().subscribe((data) => {
          console.log('DADOS DO CARRINHO GERAL:', data)
          this.produtosAdmin = data
        })
      }


      this.ofertasService.getCarrinhoPorEmail(this.userData).subscribe((dados) => {

        if (dados.status === 404) {
          this.loadingController.dismiss()
          console.log('ENTROU AQ')
        } else {

          console.log('PEDIDOS DOS CARRINHOS: ', dados)

          this.filterPedidos = dados

          const filtered = this.filterPedidos.filter(data => data.email_cliente === this.userData)

          console.log(filtered)

          if (filtered.length) {
            this.carrinhoClient = dados
            this.paramService.setCarrinhoCliente(this.carrinhoClient)
            this.produtosCadastrados = true
            this.loadingController.dismiss()
          } else {

          }
          this.loadingController.dismiss()

        }

        this.loadingController.dismiss()
        console.log(this.carrinhoClient)

      }, (error) => {
        console.log(error)
        this.loadingController.dismiss()
        this.produtosCadastrados = false
      })
    })
  }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      console.log('Entrou no router')
      this.dataUser()
    }
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

  async openModal(field, shortCode?) {
    console.log(field)

    const modal = await this.modalController.create({
      component: ModalCarrinhoPage,
      componentProps: {
        'filter': field
      }

    });

    modal.onDidDismiss().then((r) => {
      if (r !== undefined) {
        console.log(r)
        let filter = r.data.field
        let value = r.data.name
        let id = r.data.id
        let sc = r.data.shortCode

      }
    })
    return await modal.present();
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
    console.log('ID DO PRODUTO QUE DESEJA DELETAR:', id)
    this.ordemCompraService.deleteProduct(id)
      .subscribe((data: string) => {
        console.log('idPedido:', data)
      }, (error) => {
        console.log(error)
      })
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
