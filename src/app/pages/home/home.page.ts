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
  categoriasMercearia: Array<any> = ["mercearia", "hortifruti", "higiene"]
  categoriasBebidas: Array<any> = ["vinho", "refrigerante", "whisky", "vodka"]

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
    this.returnUrl = event._id
    this._paramService.setParams(this.returnUrl)
    this._router.navigate(['/tabs/restaurantes/oferta'], { state: { page: 'Home' } , replaceUrl: true })
    // const filterCategoriaMercearia = this.categoriasMercearia.filter(data => data === event.categoria)

    // console.log(filterCategoriaMercearia)
    // this._paramService.setParams(null)

    // if(filterCategoriaMercearia.length > 0) {
    //   this._paramService.setParams(this.returnUrl)
    //   this._router.navigate(['/tabs/restaurantes/oferta'], { state: { page: 'Home' } , replaceUrl: true })
    // }else {
    //   this._paramService.setParams(this.returnUrl)
    //   this._router.navigate(['/tabs/diversao/oferta'], { state: { page: 'Home' }, skipLocationChange: true })
    // }
    
  }

}
