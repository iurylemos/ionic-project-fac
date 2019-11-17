import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { OfertasService } from 'src/app/services/ofertas.service';
import { Oferta } from 'src/app/shared/Oferta.model';
import { OrdemCompraService } from 'src/app/services/ordem-compra.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-carrinho',
  templateUrl: './modal-carrinho.page.html',
  styleUrls: ['./modal-carrinho.page.scss'],
})
export class ModalCarrinhoPage implements OnInit {

  private products = new Array<Oferta>();

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private ofertasService: OfertasService,
    private ordemCompraService: OrdemCompraService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.navParams.get('filter')
    console.log(this.navParams.get('filter'))

    this.ofertasService.todasOfertas().subscribe((data) => {
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
          value: product.name
        },
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Titulo',
          value: product.price
        },
        {
          name: 'descricao',
          type: 'text',
          placeholder: 'Descrição oferta',
          value: product.picture
        },
        {
          name: 'anunciante',
          type: 'text',
          placeholder: 'Anunciante',
          value: product.name
        },
        {
          name: 'preco',
          type: 'number',
          placeholder: 'Preço',
          value: product.price
        },
        {
          name: 'destaque',
          type: 'text',
          placeholder: 'Destaque? True or false',
          value: product.picture
        },
        {
          name: 'imagem1',
          type: 'url',
          placeholder: 'Caminho imagem1',
          value: product.name
        },
        {
          name: 'imagem2',
          type: 'url',
          placeholder: 'Caminho imagem2',
          value: product.price
        },
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
            console.log(product)
            console.log(data)
            if (product.id) {
              // this.productsService.updateProduct(product.id, data);
            } else {
              // this.productsService.addProduct(data);
            }
          }
        }
      ]
    });
    await alert.present()
  }


}
