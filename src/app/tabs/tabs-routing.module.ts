import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        canActivate: [AuthGuard] ,
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
        canActivate: [AuthGuard] ,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/restaurantes/restaurantes.module').then(m => m.RestaurantesPageModule)
          },
          {
            path: 'oferta',
            loadChildren: () => import('../pages/oferta/oferta.module').then(m => m.OfertaPageModule)
          }

        ]
      },
      {
        path: 'diversao',
        canActivate: [AuthGuard] ,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/diversao/diversao.module').then(m => m.DiversaoPageModule)
          },
          {
            path: 'oferta',
            loadChildren: () => import('../pages/oferta/oferta.module').then(m => m.OfertaPageModule),
            // children: [
            //   {
            //     path: 'como-usar',
            //     loadChildren: () =>
            //     import('../pages/oferta/como-usar/como-usar.module').then(m => m.ComoUsarPageModule)
            //   },
              // {
              //   path: 'onde-fica',
              //   loadChildren: () =>
              //   import('../pages/oferta/onde-fica/onde-fica.module').then(m => m.OndeFicaPageModule)
              // }
            // ]
            
          }
        ]
      },
      {
        path: 'perfil',
        canActivate: [AuthGuard] ,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/account/account.module').then(m => m.AccountPageModule)
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
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
