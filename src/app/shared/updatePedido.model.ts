export class UpdatePedido {
  constructor(
    public status: string,
    public endereco: string,
    public formaPagamento: string
  ) { }
}