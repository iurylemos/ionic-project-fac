import { Component, OnInit } from '@angular/core';
// import { Oferta } from '../shared/Oferta.model';
// import { CarrinhoService } from '../carrinho.service';
// import { OfertasService } from '../ofertas.service';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/services/ofertas.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { Oferta } from 'src/app/shared/oferta.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.page.html',
  styleUrls: ['./oferta.page.scss'],
  providers: [ OfertasService ]
})
export class OfertaPage implements OnInit {

  public oferta: Oferta

  constructor(
   private route: ActivatedRoute, 
   private ofertasService: OfertasService,
   private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((parametros: Params) => {
      //Sempre que houver alguma alteração vou recuperar o método
      this.ofertasService.getOfertaPorId(parametros.id_oferta)
      .then((oferta: Oferta) => {
        //Ação que eu vou tomar quando a promessa estiver resolvida
        // console.log(oferta)
        this.oferta = oferta
        //Verificando o que tem dentro do objeto
        // console.log(' OFERTA OFERTA' ,this.oferta)
      })
    })

  }

  public adicionarItemCarrinho(): void {
    // Passando a oferta no template e recebendo aqui
    // console.log(this.oferta)
    //Vou pegar esse objeto e passar para o carrinhoService como sendo um item do pedido
    this.carrinhoService.incluirItem(this.oferta)
    console.log(this.carrinhoService.exibirItens())
  }

}
