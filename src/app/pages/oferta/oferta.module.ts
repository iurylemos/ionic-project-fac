import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OfertaPage } from './oferta.page';
import { OfertasService } from 'src/app/services/ofertas.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';

const routes: Routes = [
  {
    path: '',
    component: OfertaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
  declarations: [OfertaPage],
  providers: [ OfertasService ]
})
export class OfertaPageModule {}
