import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrdemCompraSucessoPage } from './ordem-compra-sucesso.page';

const routes: Routes = [
  {
    path: '',
    component: OrdemCompraSucessoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrdemCompraSucessoPage]
})
export class OrdemCompraSucessoPageModule {}
