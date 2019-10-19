import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() : Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getAuth().onAuthStateChanged(user => {
        //Se o usuário não estiver logado
        if(user) this.router.navigate(['home']);
        //Se tiver user é true, se não tiver é false
        //Retorno da promisse, se existir usuário retorno true, se não false
        resolve(!user ? true : false)
      })
    })
  }
  
}
