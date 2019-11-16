import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ordem-compra-sucesso',
  templateUrl: './ordem-compra-sucesso.page.html',
  styleUrls: ['./ordem-compra-sucesso.page.scss'],
})
export class OrdemCompraSucessoPage implements OnInit {

  public idPedidoCompra: number

  constructor(
    private router: ActivatedRoute,
    private _router: Router
  ) {
    router.queryParams.subscribe((data) => {
      console.log(data.idPedido)
      this.idPedidoCompra = data.idPedido
    })
   }

  ngOnInit() {
    console.log(this.idPedidoCompra)
    setTimeout(() => {
      this._router.navigate(['/tabs/perfil'], {  state: { 'idPedido' : 'CompraRealizada' }})
    }, 3000);
  }

}
