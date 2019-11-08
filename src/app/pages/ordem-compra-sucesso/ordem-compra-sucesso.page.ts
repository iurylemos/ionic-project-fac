import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ordem-compra-sucesso',
  templateUrl: './ordem-compra-sucesso.page.html',
  styleUrls: ['./ordem-compra-sucesso.page.scss'],
})
export class OrdemCompraSucessoPage implements OnInit {

  @Input() public idPedidoCompra: number

  constructor() { }

  ngOnInit() {
  }

}
