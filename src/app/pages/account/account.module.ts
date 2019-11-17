import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountPage } from './account.page';
import { OrdemCompraService } from 'src/app/services/ordem-compra.service';
import { ModalCarrinhoPageModule } from './modal-carrinho/modal-carrinho.module';
import { ModalCarrinhoPage } from './modal-carrinho/modal-carrinho.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AccountPage, ModalCarrinhoPage],
  providers: [OrdemCompraService],
  entryComponents: [ModalCarrinhoPage]
})
export class AccountPageModule {}
