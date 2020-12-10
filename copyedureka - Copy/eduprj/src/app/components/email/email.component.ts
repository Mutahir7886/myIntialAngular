import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Reasonlist} from '../../app.component';

const ReasonList = ['reason 1', 'reason 2', 'reason 3', 'reason 4', 'reason 5'];
const UserList = ['User 1', 'User 2', 'User 3', 'User 4', 'User 5', 'User 6', 'User 7', 'User 8'];
import {EmailData} from '../../shared/classes/email_interface';
import {myobject} from '../../app.component';
import {checkmessage} from '../../app.component';
import {checksubject} from '../../app.component';

import {MatTableDataSource} from '@angular/material/table';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  formGroup: FormGroup;
  reason: string[] = ReasonList;
  mymask = '(+00)-0000000000';
  ReasonSelected: string;
  UserSelected = 'none';
  reasoons = Reasonlist;
  isExist = false;
  MyUser: any[] = UserList;
  selectedUsers = [];
  multiselectedUsers =[];
  selectedReasons = [];
  myuserarray = [];
  default = 'Please select';
  displayedColumns: string[] = ['Users', 'Message', 'Subject', 'Reason'];
  checkthemessage = checkmessage[0];
  checkthesubject = checksubject[0];
  dropdownList = [];
  dropdownList2 = [];

  dropdownSettings: IDropdownSettings = {};

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      message: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      users: ['', Validators.required],
      reasons: ['', Validators.required],
      number: ['',  Validators.required],
      check_subject: [checksubject[0]],
      check_message: [checkmessage[0]],
    });
    console.log(this.check_subject.value);
    if (this.check_subject.value === false)
    {
      this.subject.disable() ;
    }
    else
    {
      this.subject.enable() ;
    }
    if (this.check_message.value === false)
    {
      this.message.disable() ;
    }
    else
    {
      this.message.enable() ;
    }

  }

  get message(): FormControl {
    return this.formGroup.get('message') as FormControl;
  }
  get number(): FormControl {
    return this.formGroup.get('number') as FormControl;
  }
  get check_subject(): FormControl {
    return this.formGroup.get('check_subject') as FormControl;
  }
  get check_message(): FormControl {
    return this.formGroup.get('check_message') as FormControl;
  }

  get subject(): FormControl {
    return this.formGroup.get('subject') as FormControl;
  }

  get users(): FormControl {
    return this.formGroup.get('users') as FormControl;
  }

  get reasons(): FormControl {
    return this.formGroup.get('reasons') as FormControl;
  }

  get reason_dynamic(): FormControl {
    return this.formGroup.get('reason_dynamic') as FormControl;
  }

  ngOnInit(): void {
    this.dropdownList = [
      {item_id: 1, item_text: 'Mumbai'},
      {item_id: 2, item_text: 'Bangaluru'},
      {item_id: 3, item_text: 'Pune'},
      {item_id: 4, item_text: 'Navsari'},
      {item_id: 5, item_text: 'New Delhi'}
    ];
    this.dropdownList2 = [
      {item_id: 1, item_text: 'User 1'},
      {item_id: 2, item_text: 'User 2 '},
      {item_id: 3, item_text: 'User 3'},
      {item_id: 4, item_text: 'User 4'},
      {item_id: 5, item_text: 'User 5'}
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  selectmyuser() {
    console.log(this.users.value);
    this.selectedUsers.push(this.users.value);
    console.log(this.selectedUsers);
    this.users.setValue('none');
  }

  selectmyreason() {
    if (this.reasons.value === 'none') {
    }
    console.log(this.reasons.value);
    this.selectedReasons.push(this.reasons.value);
    console.log(this.selectedReasons);
    this.reasons.setValue('none');
  }

  submit(formGroup: FormGroup) {
    console.log(this.number.value);
    myobject.push({
      Users: this.selectedUsers,
      message: this.message.value,
      subject: this.subject.value,
      reason: this.selectedReasons,
      number: this.number.value,
    });
    this.message.setValue('');
    this.subject.setValue('');
    this.reasons.setValue('');
    this.isExist = true;
    Reasonlist.splice(0, Reasonlist.length);
    this.reasoons = [];
    this.selectedUsers = [];
    console.log(myobject);
  }


  check(item) {
    if (this.selectedUsers.includes(item)) {
      return true;
    }
  }

  check2(item) {
    if (this.selectedReasons.includes(item)) {
      return true;
    }
  }

  onItemSelect(item: any)
  {
    this.multiselectedUsers.push(item.item_text);
    console.log(this.multiselectedUsers);
  }


  unselect(item) {
    if (this.selectedUsers.includes(item)) {
     this.selectedUsers.splice(item);
    }
  }

  onItemDeSelect(item) {
    const valueToRemove = item.item_text;
    this.multiselectedUsers = this.multiselectedUsers.filter( itemss => itemss !== valueToRemove);
    console.log(this.multiselectedUsers);

  }
}


// addreason() {
//   this.dynamicreasons.push(this.reason_dynamic.value);
//   console.log(this.dynamicreasons);
//   this.reason_dynamic.setValue('');
// }



