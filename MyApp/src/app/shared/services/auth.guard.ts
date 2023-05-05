import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (user) {
      return true;
    } else { 
      
      alert('Az oldal eléréséhez először jelentkezz be!');
      this.router.navigateByUrl('/home#forms');
      return false;
    }
    
  }
  
}
