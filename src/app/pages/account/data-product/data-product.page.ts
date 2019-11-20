import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamsService } from 'src/app/services/params.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { OfertasService } from 'src/app/services/ofertas.service';
import { Pedido } from 'src/app/shared/pedido.model';
import { OrdemCompraService } from 'src/app/services/ordem-compra.service';
import { UpdatePedido } from 'src/app/shared/updatePedido.model';

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
    private alertController: AlertController,
    private ordemCompraService: OrdemCompraService,
  ) {
    this.router()
    this.dadosUsuario = this.paramService.getUser()

    console.log('DADOS DO USUÁRIO: ', this.dadosUsuario)
  }

  ngOnInit() {
  }

  async router() {
    await this.presentLoading()
    this.productData = this.activedRouter.snapshot.params;
    console.log('Entrou no dados do produto: ', this.productData)
    this.productDatas = this.paramService.getCarrinhoCliente()

    console.log("CARRINHO:", this.productDatas)

    if (this.productDatas !== undefined) {
      this.exibirProduto = this.productDatas.filter((data) => data._id === this.productData.id)
      this.loading.dismiss();
    } else {
      this.ofertasService.getCarrinhosPorAdmin().subscribe((data) => {
        console.log('DADOS DO CARRINHO ADMIN:', data)

        this.productDatas = data
        this.exibirProduto = this.productDatas.filter((data) => data._id === this.productData.id)
        this.loading.dismiss();
      })
      // this.
    }




    console.log(this.exibirProduto)

    console.log('DADOS DO CARRINHO: ', this.productDatas)

  }

  public async showAlert(pedido: any = {}) {

    console.log(pedido)
    const alert = await this.alertController.create({
      header: pedido._id ? 'Atualizar pedido' : 'Criar produto',
      inputs: [
        {
          name: 'status',
          type: 'text',
          placeholder: 'Status',
          value: pedido.status
        },
        {
          name: 'formaPagamento',
          type: 'text',
          placeholder: 'Forma de pagamento',
          value: pedido.formaPagamento
        },
        {
          name: 'endereco',
          type: 'text',
          placeholder: 'Endereco',
          value: pedido.endereco
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
          cssClass: 'secondary',
          handler: data => {

            let pedidos: UpdatePedido = new UpdatePedido(
              data.status,
              data.formaPagamento,
              data.endereco
            )

            console.log(pedido)
            console.log(data)
            if (pedido._id) {
              this.presentLoading()
              this.ordemCompraService.updatePedido(pedido._id, pedidos).subscribe((data_pedido) => {
              console.log('Dados do pedido: ', data_pedido)
                this.router()
                this.loadingController.dismiss()
              });
            }
          }
        }
      ]
    });
    await alert.present()
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }

}
