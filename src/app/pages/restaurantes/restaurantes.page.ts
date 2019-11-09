import { Component, OnInit } from '@angular/core';
// import { OfertasService } from '../ofertas.service';
// import { Oferta } from '../shared/Oferta.model';
import { OfertasService } from 'src/app/services/ofertas.service';
import { Oferta } from 'src/app/shared/oferta.model';
import { Router } from '@angular/router';
import { ParamsService } from 'src/app/services/params.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.page.html',
  styleUrls: ['./restaurantes.page.scss'],
})
export class RestaurantesPage implements OnInit {
  public ofertas : Oferta[]

  constructor(
    private ofertasService: OfertasService,
    private _router: Router,
    private _paramService : ParamsService
    ) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('restaurante')
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
}
