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
  { path: 'datails', loadChildren: './pages/datails/datails.module#DatailsPageModule', canActivate: [AuthGuard] },
  { path: 'datails/:id', loadChildren: './pages/datails/datails.module#DatailsPageModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
