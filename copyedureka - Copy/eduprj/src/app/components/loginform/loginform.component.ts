import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {email, password} from "../../app.component";
import {Authservice} from "../../shared/services/authservice";

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  formGroup1: FormGroup;

  constructor(private formBuilder: FormBuilder, private authservice: Authservice)
  {
    this.formGroup1 = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6),
      Validators.pattern('((?=.*[a-z])(?=.*[/\\d/])(?=.*[A-Z]).{8,30})')]],
  });
  }

  ngOnInit(): void {

  }
  get email(): FormControl {
    return this.formGroup1.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.formGroup1.get('password') as FormControl;
  }

  submit(formGroup1: FormGroup) {
    console.log(formGroup1);
    this.authservice.SignIn(this.email.value, this.password.value);
}
}
