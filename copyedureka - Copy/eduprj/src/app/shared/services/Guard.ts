import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class DashboardGuard implements CanActivate {

  constructor() {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let current_time = new Date();
    const check_time = current_time.getMinutes();
    if (check_time % 2 == 0) {
      return true;
    } else {
      console.log('Dashboard Section can\'t be loaded at odd minutes');
    }

  }
}

@Injectable()
export class CoursesGuard implements CanActivate {

  constructor() {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let current_time = new Date();
    const check_time = current_time.getMinutes();
    if (check_time % 2 == 0) {
      console.log('Courses Section can\'t be loaded at even minutes');
    } else {
      return true;
    }

  }
}

@Injectable()
export class MYCUSTOMGUARD implements CanActivate {

  constructor() {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (localStorage.getItem('USERID'))
    {
      console.log('user is already logged in PLZ SIGNOUT');
      return  false;
    }
    else
      return true;

  }
}

export class HOMEPAGEGUARD implements CanActivate {

  constructor() {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (localStorage.getItem('USERID'))
    {
      return  true;
    }
    else
      console.log('PLZ LOG IN');
      return false;

  }
}
@Injectable()
export class ADMINGUARD implements CanActivate {

  constructor() {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if ((localStorage.getItem('USERID') === 'Z5tVykRJWyTfglXwil2cWdmVGyp1'))
    {
      return  true;
    }
    else
      console.log('Admin not logged in');
      return false;

  }
}
