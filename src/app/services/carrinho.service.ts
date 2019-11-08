// import { ItemCarrinho } from './shared/item-carrinho.model';
// import { Oferta } from './shared/Oferta.model';
import { ItemCarrinho } from '../shared/item-carrinho.model';
import { Oferta } from '../shared/oferta.model';

export class CarrinhoService {
  //Serviço que importa o modelo de dados
  //Que é utilizado dentro do serviço para criação de um atributo
  //Que corresponde a um array daquele tipo de modelo de dados
  //Portanto um array de itens do carrinho.
  public itens: ItemCarrinho[] = []

  public exibirItens(): ItemCarrinho[] {
    return this.itens
  }

  //Ele recebe uma oferta do objeto tipo Oferta
  
  public incluirItem(oferta: Oferta) : void {
    // console.log('Recebendo oferta no carrinho: ' , oferta)
    //Aqui no incluir item nós podemos criar uma instância de itemCarrinho
    //E popular os dados do itemCarrinho e popular ela com os dados da ferta
    //No array, eu pego a primeira imagem
    //Estou indo no imagens, extraindo o produto, e pegando o primeiro ojbeto
    //Como vai ser uma unica unidade, no ultimo parâmetro eu passo o 1
    let itemCarrinho: ItemCarrinho = new ItemCarrinho(
      oferta.id_oferta, 
      oferta.imagens[0], 
      oferta.titulo, 
      oferta.descricao_oferta, 
      oferta.valor, 
      1
    )

    console.log('ITEM CARRINHO? ', itemCarrinho)
    //Pegar essa instância e jogar dentro do itens da classe Carrinho
    //Que amarzena um array de itens do carrinho
    //Recupero o itens e dou o push
    //Temos uma instãncia e jogamos lá dentro
    //De tal modo quando o método exibirItens for chamado
    //Ele vai retronar o atributo itens, que contem os itens inseridos
    //1º Caso resolvido

    //No momento da inclusão da Oferta como item do carrinho
    //Vamos fazer uma tratativa, verificando se o item em questão
    //Já não existe dentro de this.itens
    //Caso ele exista, será uma inclusão de quantidade
    //Caso ele não exista, ai sim será um push
    //Se o itens que tiver lá dentro, forem igual
    //Se algum Id de lá, for igual ao id da instância do objeto
    //Que acabei de criar, que é o itemCarrinho
    //O que vou fazer é retornar uma referência
    //Para essa posição desse array de itens.
      //Vou chamar essa variavel de itemCarrinhoEncontrado.
      //Por que ai vou poder pegar uma referência para acessar
      //Aquele objeto, naquela referência naquele array.

    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id_pedido === itemCarrinho.id_pedido)
    //Vou acessar esse objeto
    //Caso encontre algum objeto igual no array lá
    //Vou atribuir só mais uma oferta escolhida, a esse mesmo carrinho
    //Se não tiver, vou dar um push, para inserir um item ao carrinho
    if(itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade += 1
    }else {
      this.itens.push(itemCarrinho)
    }
  }

  public totalCarrinhoCompras() : number {
    //Esse método vai calcular os itens do carrinho
    //Com base no seu respesctivo atributo itens,
    //E vai retornar um valor, para que eu exiba na VIEW

    let total: number = 0

    //Utilizando o map novamente que pecorre cada indice dos arrays
    //Recuperando em cada um dos loops, o respesctivo item em questão.
    this.itens.map((item: ItemCarrinho) => {
      //Para cada um desses itens eu vou incrementar a variavel total
      total = total + (item.valor * item.quantidade)
    })

    return total
  }

  public adicionarQuantidade(itemCarrinho: ItemCarrinho) : void {
    console.log(itemCarrinho)
    //Se algum dos itens tiver o id igual ao id do itemCarrinho 
    //Que estou recebendo por parãmetro, vai ser retornado esse valor
    //Como um boolean, e se tiver vou adicionar um item
    let itemCarrinhoEncontrado  = this.itens.find((item: ItemCarrinho) => item.id_pedido === itemCarrinho.id_pedido)

    //Incrementar a quantidade
    if(itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade += 1
    }
    
    
  }

  public diminuirItem(itemCarrinho: ItemCarrinho) : void {
    let itemCarrinhoEncontrado  = this.itens.find((item: ItemCarrinho) => item.id_pedido === itemCarrinho.id_pedido)

    //Dimiminuindo a quantidade
    if(itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade -= 1
      // Ou seja quando chegar a ZERO, vou remover o item do carrinho
      if(itemCarrinhoEncontrado.quantidade === 0) {
        //Não quero que a quantidade seja menor do que ZERO.
        //Vou remover esse item do array de itens do carrinho.
        this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1)
      }
    }
  }

  public limparCarrinho() : void {
    this.itens = []
  }
}