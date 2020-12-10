import {Component, OnInit} from '@angular/core';
import {FirebaseApp} from "@angular/fire";
import {Authservice} from "../../shared/services/authservice";
import {email} from "../../app.component";
import {Router} from "@angular/router";

class LOGGEDUSER {
  email: string;
  Firstname: string;
  Lastname: string;
  Title: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  logged: LOGGEDUSER = new LOGGEDUSER();

  constructor(private authservice: Authservice, public router: Router) {

  }

  ngOnInit(): void {
    this.authservice.getUserData().then((result: any) => {
      this.logged.email = result.email;
      // this.logged = {Email: result.email};
      this.logged.Firstname = result.userFirstName;
      this.logged.Lastname = result.userLastName;
    }).catch((error) => {
      console.log(error);
    });
  }

  signout() {
    this.authservice.SignOut();
  }

}
