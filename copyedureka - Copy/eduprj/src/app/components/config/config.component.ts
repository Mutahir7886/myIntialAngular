import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {checksubject} from '../../app.component';
import {checkmessage} from '../../app.component';
import {Reasonlist} from '../../app.component';
import {myobject} from '../../app.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  formGroup: FormGroup;
  dynamicreasons = Reasonlist;
  reasoncheck;
  currentmessage;
  currentelement = [ ] ;
  check: any;

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal) {
    this.formGroup = this.formBuilder.group({
      checkmessage: [checkmessage[0]],
      checksubject: [checksubject[0]],
      reason_dynamic: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  get message(): FormControl {
    return this.formGroup.get('checkmessage') as FormControl;
  }

  get subject(): FormControl {
    return this.formGroup.get('checksubject') as FormControl;
  }

  changeGlobalsubject() {
    checksubject[0] = this.subject.value;
  }

  changeGlobalmessage() {
    checkmessage[0] = this.message.value;
  }

  get reason_dynamic(): FormControl {
    return this.formGroup.get('reason_dynamic') as FormControl;
  }

  addreason() {
    if (Reasonlist.includes(this.reason_dynamic.value))
    {
      console.log('Value already present');
    }
    else {
      Reasonlist.push(this.reason_dynamic.value);
      console.log(Reasonlist);
      this.reason_dynamic.setValue('');
    }
      }

  deleteReason() {
    console.log('Reasonlist before splice');
    console.log(Reasonlist);
    console.log(Reasonlist.splice(Reasonlist.indexOf(this.reasoncheck), 1));
    console.log('Reasonlist after Splice');
    console.log(Reasonlist);
    // Reasonlist[0] = Reasonlist.filter(asd => asd !== valueToRemov);
    // console.log('After filter');
    // console.log(Reasonlist[0]);
    // console.log('ReasonList[0]');
    // console.log(Reasonlist[0]);
    this.reasoncheck = null;
    // console.log('ReasonCHeck' + this.reasoncheck);
    this.modalService.dismissAll();
  }

  openModal2(modal, reason) {
    let i = 0;
    myobject.forEach(element => {
      if (element.reason.includes(reason))
      {
        this.modalService.open(modal, {backdrop: 'static', keyboard: false});
        this.reasoncheck = reason;
        this.currentelement.push(element);
        console.log('This exists');
      }
      else {
        i = i + 1;
      }
      if (i === myobject.length)
      {
        // console.log('NOT PRESENT');
        console.log(Reasonlist.splice(Reasonlist.indexOf(reason), 1));
        // console.log('Reasonlist after Splice');
        console.log(Reasonlist);
      }
    });
  }

  deleteReasonMessage() {
    //
    // console.log(Reasonlist.splice(Reasonlist.indexOf(this.reasoncheck), 1));
    console.log('Reasonlist after Splice');
    console.log(Reasonlist);
    console.log('Current Element');
    console.log(this.currentelement);
    for (const item of this.currentelement)
    {
      console.log(item);
      myobject.splice(myobject.indexOf(item), 1);
    }
    this.modalService.dismissAll();
  }
}
