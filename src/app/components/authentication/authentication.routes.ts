import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'comingsoon',
        loadComponent: () =>
          import('./commingsoon/commingsoon.component').then(
            (m) => m.CommingsoonComponent
          ),
      },
      {
        path: 'under-maintainance',
        loadComponent: () =>
          import('./under-maintainance/under-maintainance.component').then(
            (m) => m.UnderMaintainanceComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(admin)],
  exports: [RouterModule],
})
export class authenticationRoutingModule {
  static routes = admin;
}
