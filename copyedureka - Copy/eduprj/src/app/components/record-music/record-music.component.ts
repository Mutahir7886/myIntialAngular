import { Component, OnInit } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-record-music',
  templateUrl: './record-music.component.html',
  styleUrls: ['./record-music.component.css']
})
export class RecordMusicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
