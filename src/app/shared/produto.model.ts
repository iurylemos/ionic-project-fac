//Classe modelo das ofertas
export class Produto {

  constructor(
    public categoria: string,
    public titulo: string,
    public descricao_oferta: string,
    public anunciante: string,
    public valor: number,
    public destaque: boolean,
    public imagens: Array<object>,
    public status: string,
    public data: string
  ) {

  }


}