import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonSlides, { read: IonSlides , static: true }) slides: IonSlides;
  public wavesPosition: number = 0;
  public wavesDifference: number = 80;

  constructor() { }

  ngOnInit() {
    //Bloqueando a navegação de arrastar para o lado os slides.
    // this.slides.lockSwipes(true);
  }

  segmentChanged(event: any) {
    // console.log(event)
    if(event.detail.value === "login") {
      this.slides.slidePrev();
      //Animação para as ondinhas
      this.wavesPosition += this.wavesDifference;
    }else {
      this.slides.slideNext();
      this.wavesPosition -= this.wavesDifference;
    }
  }

}
