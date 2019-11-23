import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { OfertasService } from 'src/app/services/ofertas.service';
import { Oferta } from 'src/app/shared/Oferta.model';
import { OrdemCompraService } from 'src/app/services/ordem-compra.service';
import { Router } from '@angular/router';
import { Produto } from 'src/app/shared/produto.model';

@Component({
  selector: 'app-modal-carrinho',
  templateUrl: './modal-carrinho.page.html',
  styleUrls: ['./modal-carrinho.page.scss'],
})
export class ModalCarrinhoPage implements OnInit {

  private products = new Array<Oferta>();
  private loading: any;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private ofertasService: OfertasService,
    private ordemCompraService: OrdemCompraService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router,
  ) {
    this.navParams.get('filter')
    console.log(this.navParams.get('filter'))

    this.exibirOfertas()
    
  }

  exibirOfertas() {
    this.ofertasService.todasOfertas().subscribe((data) => {
      console.log('todos ofertas', data)
      this.products = data;
    })
  }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss({ id: null, field: null });
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

  public async showAlert(product: any = {}) {

    console.log(product)
    const alert = await this.alertController.create({
      header: product._id ? 'Atualizar produto' : 'Criar produto',
      inputs: [
        {
          name: 'categoria',
          type: 'text',
          placeholder: 'Categoria',
          value: product.categoria
        },
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Titulo',
          value: product.titulo
        },
        {
          name: 'descricao_oferta',
          type: 'text',
          placeholder: 'Descrição oferta',
          value: product.descricao_oferta
        },
        {
          name: 'status',
          type: 'text',
          placeholder: 'Status atual',
          value: product.status
        },
        {
          name: 'valor',
          type: 'number',
          placeholder: 'Preço',
          value: product.valor
        },
        {
          name: 'destaque',
          type: 'text',
          placeholder: 'Destaque? True or false',
          value: product.destaque
        },
        {
          name: 'imagem1',
          type: 'url',
          placeholder: 'Caminho imagem1',
          value: product.imagens[0].url
        },
        // {
        //   name: 'imagem2',
        //   type: 'url',
        //   placeholder: 'Caminho imagem2',
        //   value: product.imagens[1].url
        // },
        // {
        //   name: 'imagem3',
        //   type: 'url',
        //   placeholder: 'Caminho imagem3',
        //   value: product.picture
        // },
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


            var dados = [{
              "url": data.imagem1
            },
            {
              "url": data.imagem2
            },
            ];

            console.log(data)


            let oferta: Produto = new Produto(
              data.categoria,
              data.titulo,
              data.descricao_oferta,
              data.status,
              data.valor,
              data.destaque,
              dados,
              data.status,
              new Date().toLocaleString()
            )


            console.log(product)
            console.log(data)
            if (product._id) {
              this.ordemCompraService.updateProduct(product._id, oferta).subscribe((data_product) => {
                console.log('Dados do produto: ',data_product)
                this.presentLoading('Adicionando produto')
                this.exibirOfertas()
                setTimeout(() => {
                  this.loadingController.dismiss()
                }, 1000);
              });
            }
          }
        }
      ]
    });
    await alert.present()
  }

  async presentLoading(messagem?) {
    this.loading = await this.loadingController.create({
      message: messagem !== null ? messagem : 'Por favor, aguarde...'
    });
    return this.loading.present();
  }


}
