import { Injectable } from '@angular/core';
import { CanActivateFn, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
      private router: Router,
  ) { }
  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const userInfo = localStorage.getItem('user');                          
      if (userInfo !== null) {
          return true;
      } else {
          let url = this.router.url;            
          this.router.navigate(['/login'], {state : {returnUrl :url}});
          return false;
      }
      
  }
}