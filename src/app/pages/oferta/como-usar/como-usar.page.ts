import { Component, OnInit } from '@angular/core';
// import { OfertasService } from 'src/app/ofertas.service';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/services/ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.page.html',
  styleUrls: ['./como-usar.page.scss'],
  providers: [ OfertasService ]
})
export class ComoUsarPage implements OnInit {

  public comoUsar: string = ''

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {
    console.log('Entrou aqui')
    console.log(this.route)

    this.route.queryParams.subscribe((parametros: Params) => {
      this.ofertasService.getComoUsarOfertaPorId(parametros.id)
      .then((resposta: any) => {
        console.log('COMPONENTE COMO USAR',resposta[0].descricao)
        this.comoUsar = resposta[0].descricao
      })
    })
  }

}
