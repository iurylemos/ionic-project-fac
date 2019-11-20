import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DataProductPage } from './data-product.page';
import { OrdemCompraService } from 'src/app/services/ordem-compra.service';

const routes: Routes = [
  {
    path: '',
    component: DataProductPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DataProductPage],
  providers: [OrdemCompraService]
})
export class DataProductPageModule {}
