import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';
import {TimeRecorded} from '../../app.component';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {
  private record;
  recording = false;
  time:number = 0;
  interval;
  myaudio = new FormControl();
  url;
  blob;
  private error;
  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
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
  /**
   * Will be called automatically.
   */
  successCallback(stream) {
    const options = {
      mimeType: 'audio/wav',
      numberOfAudioChannels: 1
    };
    //Start Actuall Recording
    const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
    this.startTimer();
    console.log(this.record);
  }
  /**
   * Stop recording.
   */
  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
    this.stopTimer();
    TimeRecorded[0] = this.time;
    console.log(TimeRecorded[0]);
  }
  /**
   * processRecording Do what ever you want with blob
   * @param  {any} blob Blog
   */
  processRecording(blob) {
    // this.url = URL.createObjectURL(blob);
    // this.blob = blob;
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (_event) => {
      console.log('yes');
      this.myaudio.setValue( reader.result);
      console.log(this.myaudio.value);
    };
  }
  /**
   * Process Error.
   */
  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }

}
