import { Component, OnInit } from '@angular/core';
// import { Oferta } from '../shared/Oferta.model';
// import { CarrinhoService } from '../carrinho.service';
// import { OfertasService } from '../ofertas.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OfertasService } from 'src/app/services/ofertas.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { Oferta } from 'src/app/shared/oferta.model';
import { ItemCarrinho } from 'src/app/shared/item-carrinho.model';
import { ParamsService } from 'src/app/services/params.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.page.html',
  styleUrls: ['./oferta.page.scss'],
})
export class OfertaPage implements OnInit {

  public oferta: Oferta
  public ofertas: Oferta
  public loading : any
  public itens: ItemCarrinho[] = []
  public retornoUrl: boolean = false

  constructor(
   private route: ActivatedRoute, 
   private ofertasService: OfertasService,
   private carrinhoService: CarrinhoService,
   private router: Router,
   private _paramService : ParamsService,
   private toastController: ToastController,
   private loadingController: LoadingController,
  ) { }

  ngOnInit() {

    
    this.route.queryParams.subscribe(params => {
      console.log('ROUTER',this.router.getCurrentNavigation())

      if(this.router.getCurrentNavigation().extras) {

        if(this.router.getCurrentNavigation().extras.skipLocationChange) {
          this.retornoUrl = true
        }
        console.log('ENTROU')
        this.pegarOferta()
      }else {
        this.retornoUrl = false
        this.pegarOferta()
      }
    })

    

  }

  public async pegarOferta()  {
    await this.presentLoading()
    this.oferta = this.ofertas

    let params = this._paramService.getParams()
    // this.route.queryParams.subscribe((parametros: Params) => {
      console.log(params)
      //Sempre que houver alguma alteração vou recuperar o método
      this.ofertasService.getOfertaPorId(params)
      .then((oferta: Oferta) => {
        //Ação que eu vou tomar quando a promessa estiver resolvida
        console.log(oferta)
        this.oferta = oferta
        //Verificando o que tem dentro do objeto
        console.log(' OFERTA OFERTA' ,this.oferta)
        this.loadingController.dismiss()
      })
  }

  public adicionarItemCarrinho(): void {
    // Passando a oferta no template e recebendo aqui
    // console.log(this.oferta)
    //Vou pegar esse objeto e passar para o carrinhoService como sendo um item do pedido
    this.carrinhoService.incluirItem(this.oferta)
    this.itens = this.carrinhoService.exibirItens()
    this.presentToast("Foi adicionado um item ao seu carrinho")

    // this.router.navigate(['carrinho'], { queryParams: { offerId: this.itens }, skipLocationChange: true })
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }

}
