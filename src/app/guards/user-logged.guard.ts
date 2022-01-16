import { Injectable }                                                                from '@angular/core';
import { AngularFireAuth }                                                           from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable }                                                                from 'rxjs';
import { map }                                                                       from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedGuard implements CanActivate {

  constructor(
    public  fireAuth: AngularFireAuth,
    private router  : Router
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.fireAuth.user.pipe(map(u => {
      return (u == null) ? this.router.parseUrl('/login'): true;
    }));
  }

}
