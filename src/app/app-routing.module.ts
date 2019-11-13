import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //Minha home só pode ser ativada de o AuthGuard retornar um valor verdadeiro
  //Com o canActive se não ele vai para a tela de Login
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  //Só pode acessar o login se o usuário estiver deslogado
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [LoginGuard] },
  { path: 'details', loadChildren: './pages/details/details.module#DetailsPageModule', canActivate: [AuthGuard] },
  { path: 'details/:id', loadChildren: './pages/details/details.module#DetailsPageModule', canActivate: [AuthGuard]  },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  // { path: 'oferta/:id', loadChildren: './pages/oferta/oferta.module#OfertaPageModule', canActivate: [AuthGuard],
  //   // children: [
  //   //   { path: '', loadChildren: './pages/como-usar/como-usar.module#ComoUsarPageModule' },
  //   //   { path: 'como-usar', loadChildren: './pages/como-usar/como-usar.module#ComoUsarPageModule' },
  //   //   { path: 'onde-fica', loadChildren: './pages/onde-fica/onde-fica.module#OndeFicaPageModule' }
  //   // ]
  // },
  { path: 'carrinho', loadChildren: './pages/ordem-compra/ordem-compra.module#OrdemCompraPageModule', canActivate: [AuthGuard] },
  { path: 'account', loadChildren: './pages/account/account.module#AccountPageModule', canActivate: [AuthGuard] },
  { path: 'data-product/:id', loadChildren: './pages/account/data-product/data-product.module#DataProductPageModule', canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
