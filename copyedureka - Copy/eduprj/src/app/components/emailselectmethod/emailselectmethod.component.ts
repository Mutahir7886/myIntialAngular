import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
interface Marker {
  lat: number;
  lng: number;

  label?: string;
  draggable: boolean;
}
@Component({
  selector: 'app-emailselectmethod',
  templateUrl: './emailselectmethod.component.html',
  styleUrls: ['./emailselectmethod.component.css']
})
export class EmailselectmethodComponent implements OnInit {
  formGroup: FormGroup;
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
  time:number = 0;
  interval;
  latmarked;
  lngmarked;
  labelmarked;
  myaudio = new FormControl();
  blob;
  private error;
  dropdownSettings: IDropdownSettings = {};

  constructor(private formBuilder: FormBuilder,private domSanitizer: DomSanitizer, private modalService: NgbModal) {
    this.formGroup = this.formBuilder.group({
      message: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      users: ['', Validators.required],
      reasons: ['', Validators.required],
      number: ['',  Validators.required],
      check_subject: [checksubject[0]],
      check_message: [checkmessage[0]],
      audio: [''],
      latitude: [''],
      longitude: ['']
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
      Users: this.multiselectedUsers,
      message: this.message.value,
      subject: this.subject.value,
      reason: this.multiselectedReasons,
      number: this.number.value,
      audio: this.audio.value,
      latitude: this.latitude.value,
      longitude: this.longitude.value,
    });
    this.message.setValue('');
    this.subject.setValue('');
    this.number.setValue('');
    this.reasons.setValue('');
    this.users.setValue('');
    this.audio.setValue('');
    this.latitude.setValue('');
    this.longitude.setValue('');

    // Reasonlist.splice(0, Reasonlist.length);
    this.multiselectedReasons = [];
    this.multiselectedUsers = [];
    console.log(myobject);
    console.log(formGroup);

  }
  ONUserSelect(item) {
    this.multiselectedUsers.push(item.item_text);
    console.log(this.multiselectedUsers);
  }

  ONUserRemove(removeditem) {
    console.log(removeditem.value.item_text);
    const valueToRemove = removeditem.value.item_text;
    this.multiselectedUsers = this.multiselectedUsers.filter( asd => asd !== valueToRemove)
    console.log(this.multiselectedUsers);
  }

  ONReasonSelect(item) {
    this.multiselectedReasons.push(item);
    console.log(this.multiselectedReasons);
  }

  ONReasonRemove(item) {
    console.log(item.value);
    const valueToRemove = item.value;
    this.multiselectedReasons = this.multiselectedReasons.filter( itemss => itemss !== valueToRemove);
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
  sanitize(url: string){
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
  /**
   * Start recording.
   */
  initiateRecording() {

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
      this.audio.setValue( reader.result);
      console.log(this.audio.value);
    };
  }

  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }

  openModal(modal) {
    this.modalService.open(modal, {backdrop: 'static', keyboard: false});
  }
  clickedMarker(label: string, index: number, lat:number , lng:number) {
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

  donelocation() {
    this.latitude.setValue(this.latmarked);
    this.longitude.setValue(this.lngmarked);
    console.log(this.latitude.value);
    console.log(this.longitude.value);
    this.modalService.dismissAll();
  }
}

