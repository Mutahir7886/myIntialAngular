import { Component, OnInit } from '@angular/core';
import {FirebaseApp} from "@angular/fire";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  userfirstname: any;
  userformgroup: FormGroup;
  userlastname: any;
  userImage: any;
  useremail: any;
   imageValue: any;
  constructor(private firebaseApp: FirebaseApp , private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.userformgroup = this.formBuilder.group({
      Email: [''],
      FirstName: [''],
      LastName: [''],
      Image: [''],
    });
  }

  ngOnInit(): void {
    this.showuserdetails();
  }
  showuserdetails()
  {
    this.firebaseApp.database().ref('users/' + localStorage.getItem('USERID')).once('value')
      .then((snapshot) => {
        console.log('true');
        console.log(snapshot.val());
        this.userfirstname = snapshot.val().FirstName;
        this.userlastname =  snapshot.val().LastName;
        this.userImage    =  snapshot.val().Image;
        this.useremail    =  snapshot.val().Email;
      }).catch((error) =>
    {
      console.log(error);
    });
  }
  get Image(): FormControl {
    return this.userformgroup.get('Image') as FormControl;
  }
  get Email(): FormControl {
    return this.userformgroup.get('Email') as FormControl;
  }
  get FirstName(): FormControl {
    return this.userformgroup.get('FirstName') as FormControl;
  }
  get LastName(): FormControl {
    return this.userformgroup.get('LastName') as FormControl;
  }
  openModal3(modal) {
    this.modalService.open(modal, {backdrop: 'static', keyboard: false});
    this.FirstName.setValue( this.userfirstname);
    this.LastName.setValue(this.userlastname);
    this.Email.setValue(this.useremail) ;
    this.Image.setValue(this.userImage);
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
      this.Image.setValue(this.imageValue);
    };
  }

  submit(formGroup: any) {
    console.log(formGroup.value);
    this.modalService.dismissAll();
  }
}
