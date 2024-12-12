import { RouterModule, Routes } from '@angular/router';
import {
  admin,
  authenticationRoutingModule,
} from '../../components/authentication/authentication.routes';
import { errorRoutingModule } from '../../components/error/error.routes';
import { NgModule } from '@angular/core';
import { pagesRoutingModule } from '../../components/pages/pages.routes';

export const authen: Routes = [
  {
    path: '',
    children: [
      ...authenticationRoutingModule.routes,
      ...errorRoutingModule.routes,
      ...pagesRoutingModule.routes,
    ],
  },
  // {
  //     path: 'auth/login',
  //     loadComponent: () =>
  //       import('../../authentication/login/login.component').then((m) => m.LoginComponent),
  //   },
];
@NgModule({
  imports: [RouterModule.forRoot(admin)],
  exports: [RouterModule],
})
export class AuthenticationsRoutingModule {}
