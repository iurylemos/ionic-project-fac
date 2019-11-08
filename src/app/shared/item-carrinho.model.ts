class ItemCarrinho {
  constructor(
    public id_pedido: number,
    public img: object,
    public titulo: string,
    public descricao_oferta: string,
    public valor: number,
    public quantidade: number
  ) {}
}

//Dessa forma poderia exportas várias classes e etc
//Se eu tivesse mais recursos que eu quisesse importar bastaria uma virgula
export { ItemCarrinho }