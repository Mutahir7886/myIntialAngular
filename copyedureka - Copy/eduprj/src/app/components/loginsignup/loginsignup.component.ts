import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {passwordValidator} from '../../shared/classes/validations';
import {CustomValidators} from '../custom-validators';
import {email} from '../../app.component';
import {password} from '../../app.component';
import {Authservice} from "../../shared/services/authservice";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-loginsignup',
  templateUrl: './loginsignup.component.html',
  styleUrls: ['./loginsignup.component.css']
})
export class LoginsignupComponent implements OnInit {

formGroup: FormGroup;
   imageValue: any;

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private authservice: Authservice, public router: Router) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),
        Validators.pattern('((?=.*[a-z])(?=.*[/\\d/])(?=.*[A-Z]).{8,30})')]],
      confirm_password: ['', [Validators.required]],
      title: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['' , Validators.required],
      address: ['', [ Validators.required, Validators.maxLength(320)]],
      errorparameter: [''],
      UserImage: '',
    },
      {
      // check whether our password and confirm password match
      validator: CustomValidators.passwordMatchValidator
    });
  }

  ngOnInit(): void {
  }

  submit(formGroup) {
    console.log(formGroup.value);
    email[0] = this.email.value;
    password[0] = this.password.value;

    this.authservice.SignUp(this.formGroup).then((result) => {
      console.log(result);
      this.formGroup.reset();
      this.router.navigate(['/homepage']);
    }).catch((error) => {
       this.toastr.show(error);
       console.log(error);
      // console.log(this.formGroup.get('errorparameter').value.message);
    });
  }
  get UserImage(): FormControl {
    return this.formGroup.get('UserImage') as FormControl;
  }
  get email(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }
  get first_name(): FormControl {
    return this.formGroup.get('first_name') as FormControl;
  }
  get last_name(): FormControl {
    return this.formGroup.get('last_name') as FormControl;
  }
  get confirm_password(): FormControl {
    return this.formGroup.get('confirm_password') as FormControl;
  }
  readUrl(files: any) {
    let mimeType;
    let file;
    if (files.target) {
      if (files.target.files.length === 0) {
        return;
      }
      // Image upload validation
      mimeType = files.target.files[0].type;
      file = files.target.files[0];
    } else {
      mimeType = files.type;
      file = files;
    }
    if (mimeType.match(/image\/*/) == null) {
      // this.toaster.error('Wrong Image selected');
      return;
    }

    // Image upload
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      console.log('yes');
      this.imageValue = reader.result;
      this.UserImage.setValue(this.imageValue);
    };
  }
}
