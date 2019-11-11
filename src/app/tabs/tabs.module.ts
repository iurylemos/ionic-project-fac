import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { HomePageModule } from '../pages/home/home.module';
import { RestaurantesPageModule } from '../pages/restaurantes/restaurantes.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    RestaurantesPageModule,
    RouterModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
