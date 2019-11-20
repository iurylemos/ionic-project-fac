import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamsService } from 'src/app/services/params.service';
import { LoadingController } from '@ionic/angular';
import { OfertasService } from 'src/app/services/ofertas.service';

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
  private dadosUsuario: Array<any> = []


  constructor(
    private activedRouter: ActivatedRoute,
    private paramService: ParamsService,
    private loadingController: LoadingController,
    private ofertasService: OfertasService,
  ) { 
    this.router()
    this.dadosUsuario = this.paramService.getUser()

    console.log('DADOS DO USUÁRIO: ',this.dadosUsuario)
  }

  ngOnInit() {
  }

   async router() {
    await this.presentLoading()
    this.productData = this.activedRouter.snapshot.params;
    console.log('Entrou no dados do produto: ', this.productData)
    this.productDatas = this.paramService.getCarrinhoCliente()

    console.log("CARRINHO:", this.productDatas)

    if(this.productDatas !== undefined) {
        this.exibirProduto = this.productDatas.filter((data) => data._id === this.productData.id)
        this.loading.dismiss();
    }else {
      this.ofertasService.getCarrinhosPorAdmin().subscribe((data) => {
        console.log('DADOS DO CARRINHO ADMIN:', data)

        this.productDatas = data
        this.exibirProduto = this.productDatas.filter((data) => data._id === this.productData.id)
        this.loading.dismiss();
      })
      // this.
    }

   


    console.log(this.exibirProduto)

    console.log('DADOS DO CARRINHO: ',this.productDatas)

  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }

}
