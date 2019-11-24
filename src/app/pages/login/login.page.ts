import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonSlides, { read: IonSlides, static: true }) slides: IonSlides;
  public wavesPosition: number = 0;
  public wavesDifference: number = 80;
  public userLogin: User = {};
  public userRegister: User = {};
  public loading: any;
  private userCollection : AngularFirestoreCollection<User>;

  constructor(
    public keyboard: Keyboard,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private fireAuth: AngularFireAuth,
    private authService: AuthService,
    private fireBase: AngularFirestore,
  ) {
    this.userCollection = this.fireBase.collection<User>('Users')
   }

  ngOnInit() {
    //Bloqueando a navegação de arrastar para o lado os slides.
    // this.slides.lockSwipes(true);
    //console.log('TECLADO ESTÁ VISIVEL: ', this.keyboard.isVisible)
    

  }

  public segmentChanged(event: any) {
    // console.log(event)
    if (event.detail.value === "login") {
      this.slides.slidePrev();
      //Animação para as ondinhas
      this.wavesPosition += this.wavesDifference;
    } else {
      this.slides.slideNext();
      this.wavesPosition -= this.wavesDifference;
    }
  }

  public async login() {
    //Coloco o await aqui no loading
    //pois só quero que seja executado dps q tiver apresentado pro user
    await this.presentLoading()

    try {
      //Posso atribuir esse método abaixo que está sendo executado
      //A uma variável, e partir dela pegar as informações do usuário
  
      // await this.authService.login(this.userLogin)
      await this.fireAuth.auth.signInWithEmailAndPassword(this.userLogin.email, this.userLogin.password);
      // this.route.navigate('/home')
    } catch (error) {
      console.error('ERROR: ',error.code)
      //Como o error está vindo inglês do firebase, 
      //vou transformar ele para português
      let message: string;
      switch (error.code) {
        case "auth/wrong-password":
          message = "Senha está incorreta"
          break;
        case "auth/user-not-found" :
          message = "Usuário não existe"
          break;
      }
      //Se der erro vou enviar ao toast que vai se o Alerta
      this.presentToast(message)
    } finally {
      this.loading.dismiss();
    }
  }

  async register() {
    // console.log(this.userRegister)
    await this.presentLoading()
    this.userRegister.isAdmin = false
    //Antes era assim, mas com o ECMA ficou mais fácil com async await
    // await this.authService.register(this.userRegister).then(res => {
    // }).catch(err => {
    // })
    //Vou tentar registrar o usuário
    try {
      await this.fireAuth.auth.createUserWithEmailAndPassword(this.userRegister.email, this.userRegister.password);
      // await this.fireBase.collection('Users').add(user)
      await this.userCollection.add(this.userRegister)
      // await this.authService.register(this.userRegister)
    } catch (error) {
      // console.error(error)
      //Como o error está vindo inglês do firebase, 
      //vou transformar ele para português
      let message: string;
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "E-mail já está em uso"
          break;
        case "auth/invalid-email" :
          message = "E-mail está no formato inválido"
          break;
      }
      //Se der erro vou enviar ao toast que vai se o Alerta
      this.presentToast(message)
    } finally {
      this.loading.dismiss();
    }
  }

  //Método que copiei da documentação: https://ionicframework.com/docs/api/loading
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }

}
