import { Component, OnInit } from '@angular/core';
// import { OfertasService } from '../ofertas.service';
// import { Oferta } from '../shared/Oferta.model';
import { OfertasService } from 'src/app/services/ofertas.service';
import { Oferta } from 'src/app/shared/oferta.model';
import { Router } from '@angular/router';
import { ParamsService } from 'src/app/services/params.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.page.html',
  styleUrls: ['./restaurantes.page.scss'],
})
export class RestaurantesPage implements OnInit {
  public ofertas : Oferta[]
  public filterCategory: string
  public loading : any

  constructor(
    private ofertasService: OfertasService,
    private _router: Router,
    private toastController: ToastController,
    private _paramService : ParamsService,
    private loadingController: LoadingController,
    ) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('mercearia')
    //Then para a resposta, passando o arrowfunction
    //Que é ação que eu vou tomar, quando a resposta estiver pronta
      .then(( ofertas: Oferta[] ) => {
        this.ofertas = ofertas
        console.log('COMPONENTE RESTAURANTES',ofertas[0])
      })
  }

  passandoDados(event) {
    console.log(event)
    this._paramService.setParams(event)
    this._router.navigate(['/tabs/restaurantes/oferta'])
  }

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

  visualizarCarrinho() {
    this._router.navigate(['/tabs/carrinho'])
  }

  async open(event) {
    // console.log(event)
    this.filterCategory = event.detail.value
    // console.log(this.filterCategory)
    await this.presentLoading()
    
    this.ofertasService.getOfertasPorCategoria(this.filterCategory)
    //Then para a resposta, passando o arrowfunction
    //Que é ação que eu vou tomar, quando a resposta estiver pronta
      .then(( ofertas: Oferta[] ) => {
        this.ofertas = ofertas
        this.loading.dismiss();
      })
  }
}
