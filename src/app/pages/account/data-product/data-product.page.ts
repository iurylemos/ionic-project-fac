import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamsService } from 'src/app/services/params.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-data-product',
  templateUrl: './data-product.page.html',
  styleUrls: ['./data-product.page.scss'],
})
export class DataProductPage implements OnInit {

  private productDatas: Array<any> = []
  private productData: any = {}
  private exibirProduto: Array<any> = []
  private loading: any;


  constructor(
    private activedRouter: ActivatedRoute,
    private paramService: ParamsService,
    private loadingController: LoadingController
  ) { 
    this.router()
    
  }

  ngOnInit() {
  }

   async router() {
    await this.presentLoading()
    this.productData = this.activedRouter.snapshot.params;
    console.log('Entrou no dados do produto: ', this.productData)
    this.productDatas = this.paramService.getCarrinhoCliente()

    console.log("CARRINHO:", this.productDatas)

    setTimeout(() => {
      this.exibirProduto = this.productDatas.filter((data) => data._id === this.productData.id)
      this.loading.dismiss();
    }, 500);


    console.log(this.exibirProduto)

    console.log('DADOS DO CARRINHO: ',this.productData)

  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }

}
