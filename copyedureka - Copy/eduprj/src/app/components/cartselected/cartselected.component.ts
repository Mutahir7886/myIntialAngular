import {Component, OnInit} from '@angular/core';
import {cartarray} from '../../app.component';
import {MatTableDataSource} from "@angular/material/table";
import {element} from "protractor";
import {FirebaseApp} from "@angular/fire";
import {rename} from "fs";
import {Lightbox} from "ngx-lightbox";

@Component({
  selector: 'app-cartselected',
  templateUrl: './cartselected.component.html',
  styleUrls: ['./cartselected.component.css']
})
export class CartselectedComponent implements OnInit {
  cartselected = cartarray;
  finalprice = 0;
  matData: MatTableDataSource<any>;
  displayedColumns: string[] = ['PrID', 'ProductName', 'ProductPrice', 'Image', 'Quantity', 'action'];
  finalPrdPrice: boolean;
  time: any = [];
  datevar: any = [];
  timestring: string;

  constructor(private firebaseApp: FirebaseApp, private lightBox: Lightbox) {
    console.log('helo');
    const t = new Date();
    t.getMinutes();
    t.getHours();
    t.getDate();
    this.datevar.push(t.getDate(), t.getMonth(), t.getFullYear());
    this.datevar.join('/');
    this.time.push(this.datevar, t.getHours(), t.getMinutes(),);
    this.timestring = this.time.join(':');
    console.log(t.getMonth());
  }

  ngOnInit(): void {

    this.matData = new MatTableDataSource(this.cartselected);
    // tslint:disable-next-line:no-shadowed-variable
  }

  showprice() {
    // tslint:disable-next-line:only-arrow-functions prefer-const typedef
    let ID = () => {
      return '_' + Math.random().toString(36).substr(2, 9);
    };
    console.log(ID());
    this.finalPrdPrice = true;
    // tslint:disable-next-line:no-shadowed-variable
    cartarray.forEach(element => {
      this.finalprice = this.finalprice + (element.ProductPrice * element.quantityitem);
    });
    const randomID = ID();
    this.firebaseApp.database().ref('Orders/' + randomID).set({
        orders: this.cartselected,
        price: this.finalprice,
        time: this.timestring,
        status: 'pending',
        userid: localStorage.getItem('USERID')
      },
    ).then((res) => {
      console.log('success');
    }).catch((err) => {
      console.log(err);
    });
    this.firebaseApp.database().ref('userHistory/' + localStorage.getItem('USERID') + '/' + randomID).set({
        orderID: randomID,
      },
    ).then((res) => {
      console.log('success');
    }).catch((err) => {
      console.log(err);
    });
  }


  // tslint:disable-next-line:no-shadowed-variable
  addquantity(element, i) {
    element.quantityitem = element.quantityitem + 1;
    cartarray[i].quantityitem = element.quantityitem;
  }

  // tslint:disable-next-line:no-shadowed-variable
  removequantity(element, i) {
    element.quantityitem = element.quantityitem - 1;
    cartarray[i].quantityitem = element.quantityitem;
  }


  openImag(imgSrc): void {
    const img = [
      {
        src: imgSrc,
        thumb: ''
      }
    ];
    this.lightBox.open(img);
  }
}
