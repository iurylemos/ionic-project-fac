// import { Pedido } from './shared/pedido.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API } from '../app.api';
import { map } from 'rxjs/operators';
import { Pedido } from '../shared/pedido.model';

//Agora está apto a receber serviços externos
@Injectable()
export class OrdemCompraService {

  //Agora vou ter condições de fazer a injeção do serviço HTTP
  constructor(private http: HttpClient) {}

  //Metodo efetivarCompra
  public efetivarCompra(pedido: Pedido): Observable<number> {
    console.log('entrou', pedido)
    // console.log(pedido)
    //Post é um observable de uma resposta
    //O conteudo que vou enviar é o pedido
    //E vou enviar pelo body 
    //Com o stringify que pega esse objeto literal
    //E retrona uma string que o representa.
    //E por fim, preciso setar no request
    //As opções da nossa requisição;
    //Mais especificamente os headers da minha requisição

    return this.http.post(`${URL_API}/pedidos`,pedido).pipe( 
      map((resposta: any) => resposta) 
    );
  }
}