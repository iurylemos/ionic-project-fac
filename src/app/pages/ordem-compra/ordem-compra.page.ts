import { Component, OnInit } from '@angular/core';
// import { ItemCarrinho } from '../shared/item-carrinho.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { OrdemCompraService } from '../ordem-compra.service';
// import { CarrinhoService } from '../carrinho.service';
// import { Pedido } from '../shared/pedido.model';
import { ItemCarrinho } from 'src/app/shared/item-carrinho.model';
import { OrdemCompraService } from 'src/app/services/ordem-compra.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { Pedido } from 'src/app/shared/pedido.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.page.html',
  styleUrls: ['./ordem-compra.page.scss']
})
export class OrdemCompraPage implements OnInit {

  public idPedidoCompra: number = undefined
  public itensCarrinho: ItemCarrinho[] = []
  public emailCliente: string
  public dadosUser = new Array<User>();
  public totalCarrinho : number

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  })

  constructor(
    private ordemCompraService: OrdemCompraService,
    public carrinhoService: CarrinhoService,
    private _router: Router,
    private fireAuth: AngularFireAuth,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    console.log('entrou no carrinho')
    this.itensCarrinho = this.carrinhoService.exibirItens()
    console.log(this.itensCarrinho)
    console.log('data:', new Date().toLocaleString())
  }

  public confirmarCompra(): void {
    //Status me retorna, valid ou invalid
    // console.log(this.formulario.status)
    if(this.formulario.status === "INVALID") {
      // console.log('Formulário está inválido')
      this.formulario.get('endereco').markAsTouched()
      this.formulario.get('numero').markAsTouched()
      this.formulario.get('complemento').markAsTouched()
      this.formulario.get('formaPagamento').markAsTouched()
    }else {
        //Caso contrário eu monto o pedido e envio para
        //OrdemCompraService
        if(this.carrinhoService.exibirItens().length === 0) {
          alert('Você não selecionou nenhum item no carrinho')
        }else {
          //Tempo aqui no pedido os dados do formulário
          //Mas não temos os itens do carrinhoService
          //Através do carrinho
          //Na prática nós precisamos pegar esses itens
          //E somar esses itens ao nosso pedido

          //Para fazer com que o pedido tenha mais um atributo
          //Que seja um array de itens de carrinho
          //Vou chamar o carrinhoService trazendo o array
          this.itensCarrinho.forEach(element => {
           this.idPedidoCompra = element.id_pedido
          });

        // let pedido: Pedido = new Pedido(
        //   this.formulario.value.endereco,
        //   this.formulario.value.numero,
        //   this.formulario.value.complemento,
        //   this.formulario.value.formaPagamento,
        //   this.carrinhoService.exibirItens()
        // )
        // console.log(pedido)
        // console.log('Formulário está válido')
        //Pegar esse pedido e encaminhar para o serviço.
        //Como o metodo retorna um Observable, sempre efetivo um subscribe
        //E como lá na classe eu retorno somente o ID contido no BODY
        //Dessa resposta
        //Portanto nós estamos retornando um parãmetro número
        //Que corresponde ao ID do documento que é inserido
        //No arquivo banco de dados

        //Então eu digo que no subscribe que assim que o idPedido
        //For retornado, eu vou pegar essa informação
        //E atribuir esse idPedido ao atributo da nossa classe.
        //Que vou chamar de IdPedidoCompra

          

        this.authService.getUsers().subscribe(data => {
          // this.dadosUser = data;
          this.dadosUser = data.filter((data) => data.email === this.fireAuth.auth.currentUser.email)
          console.log('DADOS DO USUÁRIO: ', this.dadosUser)
          for (let index = 0; index < this.dadosUser.length; index++) {
            const element = this.dadosUser[index];
  
            this.emailCliente = element.email
          }
          console.log('EMAIL CLIENTE:', this.emailCliente)

          let pedido: Pedido = new Pedido(
            this.emailCliente,
            this.formulario.value.endereco,
            this.formulario.value.numero,
            this.formulario.value.complemento,
            this.formulario.value.formaPagamento,
            this.carrinhoService.totalCarrinhoCompras(),
            new Date().toLocaleString(),
            this.carrinhoService.exibirItens(),
          )
            
           this.totalCarrinho = this.carrinhoService.totalCarrinhoCompras()

           console.log(this.totalCarrinho)
  
          this.ordemCompraService.efetivarCompra(pedido)
          .subscribe((idPedido: number) => {
            this.idPedidoCompra = idPedido
            this._router.navigate(['/tabs/compra-realizada'], { queryParams: { idPedido } , replaceUrl: true })
            // console.log('Imprimindo o id do pedido' +this.idPedidoCompra)
            //Além de recuperar o id do pedido
            //executar a limpeza
            this.carrinhoService.limparCarrinho()
          })
        })
      }

    }
  }

  public adicionar(item: ItemCarrinho) : void {
    //Ele vai fazer uma ponte entre o template o serviço
    this.carrinhoService.adicionarQuantidade(item)
  }

  public diminuir(item: ItemCarrinho): void {
    this.carrinhoService.diminuirItem(item)
  }

}
