// import { Oferta } from './shared/Oferta.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../app.api';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { Oferta } from '../shared/oferta.model';
//Criando um serviço.
//Decorando a classe com o Injectable
//Ou seja ela vai ter outro serviço injetado nela.
//Para receber outro serviço, que é o Http.

@Injectable()
export class OfertasService {
  // private url_api = 'http://localhost:3000/ofertas';
  ofertas: Oferta[];

  //Para criar um serviço, precisamos passar essa instancia
  //Dessa serviço, no construtor da classe

  constructor(private http: HttpClient) { }

  public getOfertas(): Promise<Oferta[]> {
    //Efetuar uma requisição HTTP e retornar uma promessa
    //Consulta e consumindo o serviço
    return this.http.get<Oferta[]>(`${URL_API}/ofertas?destaque=true`)
      .toPromise()
      //O then ele recupera o parâmetro resolvido.
      //Vou retornar do tipo any pois não exatamente oq retorna
      //E vou recuperar essa resposta com o metodo json
      //Que é um metodo do ojbeto resposta que consiste
      //na promessa gerada a apartir da conversão do observable
      //O rxjs faz essa conversão e esse objeto retornado
      //Possui esse metodo que podemos executar
      //Para retornar um objeto literal, que é o que precisamos
      //Que é o array de ofertas
      .then(o => this.ofertas = o)
    //Contendo um arry de ofertas
  }

  public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
    return this.http.get<Oferta[]>(`${URL_API}/ofertas?categoria=${categoria}`)
      .toPromise()
      .then((o => this.ofertas = o))
  }

  //Se eu tivesse um array com 3 posições, 0 1 2
  //E utilizasse a função shift, nós iriamos extrair
  //O valor contido dentro do indice 0 do array
  //E os valors contido 1,2 seriam deslocados para o 1
  public getOfertaPorId(id: number): Promise<Oferta> {
    console.log(id)
      return this.http.get<Oferta[]>(`${URL_API}/ofertas?id_oferta=${id}`)
        .toPromise()
        .then((o => {
          console.log(o)
          return o.shift();
        }))
  }

  //como o retorno do banco de dados é apenas uma descrição
  //Nós não vamos precisar montar um objeto mais completo para
  //obter esse retorno
  public getComoUsarOfertaPorId(id: number): Promise<string> {
    return this.http.get<string>(`${URL_API}/como-usar?id_comousar=${id}`)
      .toPromise()
      .then((comoUsar => {
        // console.log(comoUsar[0].descricao)
        return comoUsar
      }))
  }

  public getOndeFicaOfertaPorId(id: number): Promise<string> {
    return this.http.get<string>(`${URL_API}/onde-fica?id_ondefica=${id}`)
      .toPromise()
      .then((ondeFica => {
        // console.log(comoUsar[0].descricao)
        return ondeFica
      }))
  }

  //Quando coloco _like ele reconhece que estou fazendo uma pesquisa
  //No campo de input por aproximação
  //O Retry é utilizando para em casos de erros de conexão
  //Ele é testado durante várias vezes, igual eu defino no seu parâmetro
  //Ele tenta as 10 tentativas na requisição no caso.
  public pesquisaOfertas(termo: string): Observable<Oferta[]> {
    //Retornando os dados da requisição http
    return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
      .pipe(retry(10), (map((resposta: any) => resposta)))
  }

  public todasOfertas() : Observable<any> {
    return this.http.get(`${URL_API}/ofertas`)
    .pipe(retry(10), (map((resposta: any) => resposta)))
  }

}