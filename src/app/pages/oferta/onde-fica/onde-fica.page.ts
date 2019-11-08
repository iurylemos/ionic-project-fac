import { Component, OnInit } from '@angular/core';
// import { OfertasService } from 'src/app/ofertas.service';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/services/ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.page.html',
  styleUrls: ['./onde-fica.page.scss'],
  providers: [ OfertasService ]
})
export class OndeFicaPage implements OnInit {

  public ondeFica: string = ''

  constructor(
    private route: ActivatedRoute, 
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe((parametros: Params) => {
      this.ofertasService.getOndeFicaOfertaPorId(parametros.id)
      .then((ondeFica: any) => {
        // console.log(ondeFica[0].descricao)
        this.ondeFica = ondeFica[0].descricao
      })
    })
  }

}
