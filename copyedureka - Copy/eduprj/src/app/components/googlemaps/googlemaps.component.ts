import {Component, OnInit} from '@angular/core';
import {myobject} from '../../app.component';
interface Marker {
  lat: number;
  lng: number;

  label?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.css']
})
export class GooglemapsComponent implements OnInit {
  zoom = 15;
  lat: number;
  lng: number;
  latmarked;
  lngmarked;
  labelmarked;
  markers: Marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ];

  constructor() {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
    myobject.forEach(element => {
      this.markers.push({
        lat: element.latitude,
        lng: element.longitude,
        draggable: true,
        label: JSON.stringify(element.Users)
      });
    });
  }

  ngOnInit(): void {
  }

  clickedMarker(label: string, index: number, lat:number , lng:number) {
    console.log(`clicked marker : ${label || index}`);
    console.log('latitude markked ' + lat);
    console.log('clicked the marker' + lng);
    this.latmarked = lat;
    this.lngmarked = lng;
    this.labelmarked = label;
  }

  mapClicked($event: MouseEvent) {
    console.log($event);
    this.markers.push({
      // @ts-ignore
      lat: $event.coords.lat,
      // @ts-ignore
      lng: $event.coords.lng,
      draggable: true,
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  access() {
    console.log(myobject);
    myobject.forEach(element => {
      this.markers.push({
        lat: element.latitude,
        lng: element.longitude,
        draggable: true,
        label: JSON.stringify(element.Users)
      });
    });
  }
}
