import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomePageComponent} from "./user/home-page/home-page.component";
import {AuthGuard} from "./helper/auth-guard";
import {ProfileComponent} from "./profile/profile.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ShowWalletComponent} from "./wallet/show-wallet/show-wallet.component";
import {ShowCategoryComponent} from "./category/show-category/show-category.component";

const routes: Routes = [{
  path:'home',
  component: HomeComponent
}, {
  path: '',
  component: LoginComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'profile',
  component: ProfileComponent
}, {
  path: 'change-password',
  component: ChangePasswordComponent
}, {
  path: 'wallet',
  component: ShowWalletComponent,
  loadChildren: () => import('./wallet/show-wallet/show-wallet-routing.module').then(module => module.ShowWalletRoutingModule)
}, {
  path: 'category',
  component: ShowCategoryComponent,
  loadChildren: () => import('./category/show-category/show-category-routing.module').then(module => module.ShowCategoryRoutingModule)
}, {
  path: 'user',
  canActivate: [AuthGuard],
  component: HomePageComponent,
  loadChildren: () => import('./user/user-routing.module').then(module => module.UserRoutingModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
