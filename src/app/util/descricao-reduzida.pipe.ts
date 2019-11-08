import { PipeTransform, Pipe } from '@angular/core';

//Classe de representação aos pipes personalizados
//Declarando dessa forma, o angular já entende que aqui é uma classe
//E não um componente.
@Pipe({
  name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {

  //Metodo transform é responsável por receber o dado
  //Que vai ser tratado, pode ser qualquer tipo de informação.
  transform(texto: string, truncarEm: number, comeceAPartir: number): string {
      //Verificar se a string possui mais do que 15 caracteres
      if(texto.length > truncarEm) {
        //Retorno a string truncada.
        //Vou cortar do primeiro caractere até a 15 posição.
        return texto.substr(comeceAPartir, truncarEm) +  '...'
      }else {
        return texto
      }
  }
}