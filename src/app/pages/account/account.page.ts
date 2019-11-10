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
  public dadosUser = new Array<User>();

  public formulario: FormGroup = new FormGroup({
    'id_oferta': new FormControl(null, [Validators.required]),
    'categoria': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'titulo': new FormControl(null),
    'descricao_oferta': new FormControl(null, [Validators.required]),
    'anunciante': new FormControl(null, [Validators.required]),
    'valor': new FormControl(null, [Validators.required]),
    'destaque': new FormControl(null, [Validators.required]),
    'imagem1': new FormControl(null, [Validators.required]),
    'imagem2': new FormControl(null, [Validators.required]),
  })

  constructor(
    private productsService: ProductService,
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private fireAuth: AngularFireAuth,
    private ordemCompraService: OrdemCompraService,
  ) {
    this.productsSubscription = this.productsService.getProducts().subscribe(data => {
      this.products = data;
      console.log(this.products)
    });
    this.dataUser()
  }

  dataUser() {
    this.authService.getUsers().subscribe(data => {
      this.dadosUser = data;
      this.dadosUser = this.dadosUser.filter((data) => data.email === this.fireAuth.auth.currentUser.email)
      console.log('DADOS DO USUÁRIO: ', this.dadosUser)
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

  public async showAlert(product: any = {}) {

    if (!this.user.isAdmin) {
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

  cadastrarProduto() {
    console.log(this.formulario)
    if (this.formulario.status === "INVALID") {
      console.log('Formulário está inválido')
      this.formulario.get('id_oferta').markAsTouched()
      this.formulario.get('categoria').markAsTouched()
      this.formulario.get('titulo').markAsTouched()
      this.formulario.get('descricao_oferta').markAsTouched()
      this.formulario.get('anunciante').markAsTouched()
      this.formulario.get('valor').markAsTouched()
      this.formulario.get('destaque').markAsTouched()
      this.formulario.get('imagens').markAsTouched()
    } else {

      var data = [{
        "url": this.formulario.value.imagem1
      },
      {
        "url": this.formulario.value.imagem2
      }
      ];

      console.log('entrou no else')
      let oferta: Produto = new Produto(
        this.formulario.value.id_oferta,
        this.formulario.value.categoria,
        this.formulario.value.titulo,
        this.formulario.value.descricao_oferta,
        this.formulario.value.anunciante,
        this.formulario.value.valor,
        this.formulario.value.destaque,
        data,
      )

      this.ordemCompraService.cadastrarProduto(oferta).subscribe((data) => {
        console.log(data)
      })
    }
  }
}
