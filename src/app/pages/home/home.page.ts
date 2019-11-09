import { Component, OnInit } from '@angular/core';
import { Oferta } from '../../shared/Oferta.model';
import { Cliente } from '../../shared/cliente.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertasService } from 'src/app/services/ofertas.service';
import { ParamsService } from 'src/app/services/params.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [OfertasService]
})
export class HomePage implements OnInit {

  //Atributo oferta
  public ofertas: Oferta[]
  currentUser: Cliente;
  returnUrl: number;

  constructor(
    private ofertasService: OfertasService,
    private _router: Router,
    private _paramService : ParamsService
  ) { }

  ngOnInit() {
    this.ofertasService.getOfertas()
      .then(( ofertas: Oferta[] ) => {
        console.log('A função resolve() foi resolvida depois de 3 segundos')
        console.log('COMPONENTE HOME', ofertas)
        //Resolve da promisse
        this.ofertas = ofertas

      })
      .catch((param: any) => {
        //Reject da promisse
        console.log(param)
      })
  }

  passandoDados(event) {
    console.log(event)
    this.returnUrl = event
    console.log(this.returnUrl)
    // const filter = this.returnUrl.filter(data => data.offerId < 3)

    // console.log(filter)


    if(this.returnUrl < 3) {
      this._paramService.setParams(this.returnUrl)
      this._router.navigate(['/tabs/restaurantes/oferta'])
    }else {
      this._paramService.setParams(this.returnUrl)
      this._router.navigate(['/tabs/diversao/oferta'])
    }
    
  }

}
