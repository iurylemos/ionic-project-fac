import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrdemCompraService } from 'src/app/services/ordem-compra.service';
import { Produto } from 'src/app/shared/produto.model';
import { ParamsService } from 'src/app/services/params.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  private product : Product = {};
  private loading: any;
  private productId: string = '';
  private productSubscription: Subscription
  private productData: any
  private productClient: Array<any>
  private productExiste : boolean = false

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

  public formularioUpdate: FormGroup = new FormGroup({
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
    private loadingController: LoadingController,
    private toastController: ToastController,
    private authService: AuthService,
    private productService: ProductService,
    private activedRouter: ActivatedRoute,
    private navController: NavController,
    private ordemCompraService: OrdemCompraService,
    private paramService: ParamsService
  ) { 
    // this.productId = this.activedRouter.params['id'];
    this.productData = this.activedRouter.snapshot.params;

    // console.log(this.productData.id)
    this.productId = this.productData.id
    console.log(this.productId)
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
      try {
        await this.productService.updateProduct(this.productId, this.product)
        await this.loading.dismiss(); 

        //navcontroller com navBack para voltar a pagina anterior
        this.navController.navigateBack('/home');
      }catch(error) {
        this.presentToast('Erro ao tentar atualizar produto');
        this.loading.dismiss()
      }

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

    this.productClient = this.paramService.getCarrinhoCliente()
    const filtered = this.productClient.filter(data => data._id === this.productId)
    console.log('Filtered::',filtered)
    if(filtered.length > 0) {
      this.productExiste = true
    }

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    //Criei a subscription aqui e vou deletar
    if(this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  atualizarProduto() {
    console.log(this.formularioUpdate)
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
