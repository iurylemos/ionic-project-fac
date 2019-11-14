import { ItemCarrinho } from './item-carrinho.model';

export class Pedido {
  constructor(
    public email_cliente: string,
    public endereco: string,
    public numero: string,
    public complemento: string,
    public formaPagamento: string,
    public valor: number,
    public data: string,
    public itens: Array<ItemCarrinho>,
  ) { }
}