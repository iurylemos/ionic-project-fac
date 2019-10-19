import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  public login(user: User) {

  }

  public register(user: User) {
    console.log(user)
    return this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  public logout() {

  }

  public getAuth() {

  }
}
