import {Component, OnInit} from '@angular/core';
import {EmailData} from './shared/classes/email_interface';
import {Authservice} from "./shared/services/authservice";

export const myobject: EmailData[] = [];
export let checkmessage = [true];
export let checksubject = [true];
export let Reasonlist = ['1', '2', '3'];
export let TimeRecorded = [];
export let email = [];
export let password = [];
export let cartarray = [];
export let selectedglobal = [];
export let userHistoryArray = [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'eduprj';
  isNotLoggedIn = true;
  LoggedIn: true;
  constructor(private authService: Authservice) {
  }
  ngOnInit() {
    this.authService.loginSubscription
      .subscribe((value: boolean) => {
        this.isNotLoggedIn = value;
      });
    console.log('yes');
    this.checkUser();
  }
  checkUser(): void
  {
    if (localStorage.getItem('USERID')) {
      console.log('yes');
      this.authService.loginSubscription.next(true);
    } else {
      this.authService.loginSubscription.next(false);
    }
  }
}


