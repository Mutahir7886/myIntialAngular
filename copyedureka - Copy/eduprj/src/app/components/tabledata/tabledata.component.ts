import { Component, OnInit } from '@angular/core';
import {myobject} from '../../app.component';
import {MatTableDataSource} from "@angular/material/table";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-tabledata',
  templateUrl: './tabledata.component.html',
  styleUrls: ['./tabledata.component.css']
})
export class TabledataComponent implements OnInit {
  displayedColumns: string[] = ['Users', 'Message', 'Subject', 'Reason', 'Number', 'audio', 'latitude', 'longitude'];
  matData: any;
  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    console.log(myobject);
    this.matData = new MatTableDataSource(myobject);
  }

  sanitize(url: string){
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
}
