import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../../services/http.service";
import {Router} from "@angular/router";
import {apiUrls} from "../../../environments/apis/api.urls";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  formGroup1: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private httpService: HttpService,
              public router: Router,
  ) {
    this.formGroup1 = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, ]],
    });

  }

  get username(): FormControl {
    return this.formGroup1.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.formGroup1.get('password') as FormControl;
  }

  ngOnInit(): void {
  }

  submit(formGroup1: FormGroup): void {
    console.log(formGroup1.value);
    // tslint:disable-next-line:max-line-length
    this.httpService.post(apiUrls.login, {password: this.password.value, username: this.username.value}).subscribe(data => {
      console.log(data);
      localStorage.setItem('zaitoonEmail', data.email);
      localStorage.setItem('zaitoonUsername', data.username);
      localStorage.setItem('zaitoonToken', data.tokenID);

      this.router.navigate(['/zaitoon']);
      formGroup1.reset();
    }, error => {

    });

  }
}
