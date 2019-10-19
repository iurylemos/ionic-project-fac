import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { resolve } from 'q';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() : Promise<boolean> {
    return new Promise(resolve => {
      //verificar se o usuário está logado ou não
      //O método onAuthStateChanged ele verifica se o usuário
      //Está logado, ou foi apagado ou se fez logout
      //Ele verifica se ocorre alguma alteração
      //Ele me retorna um valor, e eu chamei de user
      //Se no caso ele me retornar nulo ou indefined
      //É por que o usuário não existe ou não está logado
      this.authService.getAuth().onAuthStateChanged(user => {
        //Se o usuário não estiver logado
        if(!user) this.router.navigate(['login']);
        //Se tiver user é true, se não tiver é false
        //Retorno da promisse, se existir usuário retorno true, se não false
        resolve(user ? true: false)
      })
    })
  }
  
}
