import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Observable, Subject} from 'rxjs';


@Injectable({providedIn: 'root'})
export class ActionService {
  private someAction: Subject<any> = new Subject<any>();
  private someActionObs = this.someAction.asObservable();


  publishValue(value): any {
    this.someAction.next(value);
  }

  getAction(): Observable<any> {
    return this.someActionObs;
  }
}
