import { Routes } from '@angular/router';
import { ContentLayoutComponent } from './shared/layouts/content-layout/content-layout.component';
import { content } from './shared/routes/content.routes';
import { AuthenticationLayoutComponent } from './shared/layouts/authentication-layout/authentication-layout.component';
import { authen } from './shared/routes/auth.routes';
import { authGuardNew } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [authGuardNew],
    children: [
      ...content, // Assuming content contains other child routes
    ],
  },
  {
    path: '',
    component: AuthenticationLayoutComponent,
    children: [
      { path: '', redirectTo: 'pages', pathMatch: 'full' },
      ...authen,
    ],
  },
  { path: '', redirectTo: 'pages/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/error/error404' },
];
