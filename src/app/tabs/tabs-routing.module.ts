import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'restaurantes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/restaurantes/restaurantes.module').then(m => m.RestaurantesPageModule)
          }
        ]
      },
      {
        path: 'diversao',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/diversao/diversao.module').then(m => m.DiversaoPageModule)
          }
        ]
      },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/ordem-compra/ordem-compra.module').then(m => m.OrdemCompraPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
