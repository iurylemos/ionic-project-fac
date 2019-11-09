import { Component, OnInit } from '@angular/core';
import { OfertasService } from 'src/app/services/ofertas.service';
import { Oferta } from 'src/app/shared/oferta.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.page.html',
  styleUrls: ['./diversao.page.scss'],
  providers: [ OfertasService ]
})
export class DiversaoPage implements OnInit {

  public ofertas: Oferta[]

  constructor(
    private ofertasService: OfertasService,
    private _router: Router) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('diversao')
    .then((ofertas: Oferta[] ) => {
      this.ofertas = ofertas
      console.log('COMPONENTE DIVERSÃO', ofertas)
    })
  }

  passandoDados(event) {
    console.log(event)
    this._router.navigate(['/tabs/diversao/oferta'], { queryParams: { offerId: event }, skipLocationChange: true })
  }

}
