import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { AccountPage } from '../pages/account/account.page';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: AccountPage
  private userSubscription: Subscription

  constructor(
    private fireAuth: AngularFireAuth,
    private fireBase: AngularFirestore
  ) { }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  public async login(user: User) {
    console.log(user)
    try {
      await this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      this.loadUser();
    } catch (error) {

    }
  }

  public async register(user: User) {
    console.log(user)
    try {
      await this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      await this.fireBase.collection('Users').add(user)
    } catch (error) {
      
    }
    // return this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  public loadUser() {
    this.userSubscription = this.fireBase.collection('Users').doc(this.fireAuth.auth.currentUser.uid).valueChanges().subscribe(data => {
      if (data) this.user.user = data
    })
  }

  public logout() {
    return this.fireAuth.auth.signOut();
  }

  public getAuth() {
    //Esse daqui é o objeto de autenticação do usuário
    return this.fireAuth.auth;
  }
}
