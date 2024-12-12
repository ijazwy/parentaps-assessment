import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
  {
    path: 'pages',
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'aboutus',
        loadComponent: () =>
          import('./aboutus/aboutus.component').then((m) => m.AboutusComponent),
      },
      {
        path: 'contactus',
        loadComponent: () =>
          import('./contactus/contactus.component').then(
            (m) => m.ContactusComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(admin)],
  exports: [RouterModule],
})
export class pagesRoutingModule {
  static routes = admin;
}
