import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrdemCompraPage } from './ordem-compra.page';
// import { OrdemCompraService } from '../ordem-compra.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { OrdemCompraService } from 'src/app/services/ordem-compra.service';
// import { CarrinhoService } from '../carrinho.service';


const routes: Routes = [
  {
    path: '',
    component: OrdemCompraPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [OrdemCompraPage],
  providers: [OrdemCompraService]
})
export class OrdemCompraPageModule {}
