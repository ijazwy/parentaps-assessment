import { Injectable, inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuardNew = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUserValue) {
    return true;
  }
  authService.logout();
  return false;
};