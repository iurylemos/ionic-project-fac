import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RestaurantesPage } from './restaurantes.page';
import { OfertasService } from 'src/app/services/ofertas.service';
// import { OfertasService } from '../ofertas.service';

const routes: Routes = [
  {
    path: '',
    component: RestaurantesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RestaurantesPage],
  providers: [ OfertasService ]
})
export class RestaurantesPageModule {}
