import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
  {
    path: 'operations',
    children: [
      {
        path: 'users',
        loadComponent:() => import('./users/users-list/users-list.component').then((m) => m.UsersListComponent)
      },
      //------------------------------------------------------------------------------------------------------------------------------------------------------------
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(admin)],
  exports: [RouterModule],
})
export class OperationsRoutingModule {
  static routes = admin;
}
