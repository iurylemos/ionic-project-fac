import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  public login(user: User) {
    console.log(user)
    return this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  public register(user: User) {
    console.log(user)
    return this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  public logout() {

  }

  public getAuth() {
    //Esse daqui é o objeto de autenticação do usuário
    return this.fireAuth.auth;
  }
}
