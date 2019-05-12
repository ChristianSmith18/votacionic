import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';

// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

// Redirection
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {
  constructor(private authAFB: AngularFireAuth, private router: Router) {}

  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authAFB.authState.pipe(
      map(auth => {
        // tslint:disable-next-line: deprecation
        if (isNullOrUndefined(auth)) {
          return true;
        } else {
          this.router.navigateByUrl('/tabs/tab1)');
          return false;
        }
      })
    );
  }
}
