import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Reasonlist} from '../../app.component';

const UserList = ['User 1', 'User 2', 'User 3', 'User 4', 'User 5', 'User 6', 'User 7', 'User 8'];
const ReasonList = ['reason 1', 'reason 2', 'reason 3', 'reason 4', 'reason 5'];
import {EmailData} from '../../shared/classes/email_interface';
import {myobject} from '../../app.component';
import {checkmessage} from '../../app.component';
import {checksubject} from '../../app.component';
import {TimeRecorded} from '../../app.component';
import * as RecordRTC from 'recordrtc';
import {MatTableDataSource} from '@angular/material/table';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {element} from "protractor";

interface Marker {
  lat: number;
  lng: number;

  label?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-selectbyuser',
  templateUrl: './selectbyuser.component.html',
  styleUrls: ['./selectbyuser.component.css']
})
export class SelectbyuserComponent implements OnInit {
  formGroup: FormGroup;
  formGroup1: FormArray;

  reason: string[] = ReasonList;
  mymask = '(+00)-0000000000';
  reasoons = Reasonlist;
  isExist = false;
  zoom = 15;
  lat;
  lng;
  MyUser: any[] = UserList;
  selectedUsers = [];
  multiselectedUsers = [];
  selectedReasons = [];
  multiselectedReasons = [];
  checkthemessage = checkmessage[0];
  checkthesubject = checksubject[0];
  UserList2 = [];
  markers: Marker[] = [];
  private record;
  recording = false;
  time: number = 0;
  interval;
  latmarked;
  lngmarked;
  labelmarked;
  myaudio = new FormControl();
  blob;
  private error;
  dropdownSettings: IDropdownSettings = {};
  usersArray: FormArray;
  currentSelected = 0;
   latarray: any;
   myuseraudioindex: any;

  constructor(private formBuilder: FormBuilder, private domSanitizer: DomSanitizer, private modalService: NgbModal) {
    this.formGroup = this.formBuilder.group({
      users: ['', ],
      new_field: this.formBuilder.array([]),
    });
    this.usersArray = this.formGroup.get('new_field') as FormArray;
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        console.log(this.lng);
        this.lat = +pos.coords.latitude;
        console.log(this.lat);
      });
    }
  }

  get latitude(): FormControl {
    return this.formGroup.get('latitude') as FormControl;
  }

  get longitude(): FormControl {
    return this.formGroup.get('longitude') as FormControl;
  }

  get audio(): FormControl {
    return this.formGroup.get('audio') as FormControl;
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

  get formarraynumber(): FormControl{
    return this.addmessagesubject().controls.key as FormControl;
  }

  addmessagesubject(): FormGroup {
    return this.formBuilder.group({
      user_info: [''],
      message: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      number: ['', Validators.required],
      reasons: ['', Validators.required],
      audio: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.UserList2 = [
      {item_id: 1, item_text: 'User 1'},
      {item_id: 2, item_text: 'User 2 '},
      {item_id: 3, item_text: 'User 3'},
      {item_id: 4, item_text: 'User 4'},
      {item_id: 5, item_text: 'User 5'}
    ];
    console.log(TimeRecorded);
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

  submit(formGroup: FormGroup) {
    let id = 0;
    this.formGroup.get('new_field').value.forEach( iitem =>
    {
      myobject.push({
        Users: this.multiselectedUsers[id],
        message: iitem.message,
        subject: iitem.subject,
        reason: iitem.reasons,
        number: iitem.number,
        audio: iitem.audio,
        latitude: iitem.latitude,
        longitude: iitem.longitude,
      });
      id = id + 1;
    });
    console.log(formGroup);
    console.log(myobject);
  }

  ONUserSelect(item) {
    console.log('yes selected');
    if (this.multiselectedUsers.includes(item)){
      console.log('Yes');
    }
    else {
      console.log('No');
    }
    this.multiselectedUsers.push(item.item_text);
    console.log(item.item_id);
    this.usersArray.push(this.addmessagesubject());
    console.log(this.multiselectedUsers);
  }

  ONUserRemove(removeditem) {
    console.log(removeditem.value.item_text);
    const valueToRemove = removeditem.value.item_text;
    this.multiselectedUsers = this.multiselectedUsers.filter(asd => asd !== valueToRemove);
    this.usersArray.controls.splice(removeditem.index,1);
    console.log(this.multiselectedUsers);
  }

  ONReasonSelect(item) {
    console.log(item);
  }

  ONReasonRemove(item) {
    console.log(item.value);
    const valueToRemove = item.value;
    this.multiselectedReasons = this.multiselectedReasons.filter(itemss => itemss !== valueToRemove);
    console.log(this.multiselectedReasons);
  }

  startTimer() {
    this.time = 0;
    this.interval = setInterval(() => {
      this.time++;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  /**
   * Start recording.
   */
  initiateRecording(i) {
    this.myuseraudioindex = i;
    this.recording = true;
    const mediaConstraints = {
      video: false,
      audio: true
    };

    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  successCallback(stream) {
    const options = {
      mimeType: 'audio/wav',
      numberOfAudioChannels: 1
    };
    const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
    this.startTimer();
    console.log(this.record);
  }

  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
    this.stopTimer();
    TimeRecorded[0] = this.time;
    console.log(TimeRecorded[0]);
  }

  processRecording(blob) {
    // this.url = URL.createObjectURL(blob);
    // this.blob = blob;
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (_event) => {
      console.log('yes');
      this.usersArray.controls[this.myuseraudioindex].get('audio').setValue(reader.result);
      // this.audio.setValue(reader.result);
      console.log(this.usersArray.controls[this.myuseraudioindex].get('audio'));
    };
  }

  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }

  openModal(modal) {
    this.modalService.open(modal, {backdrop: 'static', keyboard: false});
  }

  clickedMarker(label: string, index: number, lat: number, lng: number) {
    console.log(`clicked marker : ${label || index}`);
    console.log('latitude markked ' + lat);
    console.log('clicked the marker' + lng);

  }

  mapClicked($event: MouseEvent) {
    console.log($event);
    // @ts-ignore
    this.latmarked = $event.coords.lat;
    // @ts-ignore
    this.lngmarked = $event.coords.lng;
    // @ts-ignore
    this.labelmarked = this.users.value;
    this.markers.push({
      // @ts-ignore
      lat: $event.coords.lat,
      // @ts-ignore
      lng: $event.coords.lng,
      draggable: true,
      label: 'Current Location'
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  donelocation(user) {
    // this.latitude.setValue(this.latmarked);
    // this.longitude.setValue(this.lngmarked);
    this.usersArray.controls[user].get('latitude').setValue(this.latmarked);
    this.usersArray.controls[user].get('longitude').setValue(this.lngmarked);
    console.log(this.usersArray.controls[user]);
    console.log(this.usersArray.controls);
    this.modalService.dismissAll();
  }
}

