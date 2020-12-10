import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FirebaseApp} from "@angular/fire";
import {element} from "protractor";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

interface myorderobj {
  price: number;
  orders: any;
  orderID: string;
}

@Component({
  selector: 'app-admindashbord',
  templateUrl: './admindashbord.component.html',
  styleUrls: ['./admindashbord.component.css']
})
export class AdmindashbordComponent implements OnInit {
  StatusList = [];
  dataloaded: boolean;
  orderkey: any = [];
  orderelements: any = [];
  orderprice: any = [];
  elementtoproceed: any;
  productelements: any = [];
  MyOrderObj: myorderobj[] = [];
  matData: MatTableDataSource<any>;
  displayedColumns: string[] = ['OrderID', 'OrderPrice', 'OrderTime', 'Action', 'selectstatus'];
  myelementkey: any = [];
  myelementorders: any = [];
  status: any[] = [];
  dispatchedarray: any[] = [];
  userlogg = '';
  value1array: any = [];
   checkarray: any = [];

  constructor(private firebaseApp: FirebaseApp,
              private modalService: NgbModal) {
    console.log('orders');
  }

  ngOnInit(): void {
    // this.firebaseApp.database().ref('users/' + localStorage.getItem('USERID')).once('value')
    //   .then((snapshot) => {
    //     console.log('true');
    //     this.userlogg = snapshot.val().FirstName;
    //     console.log(this.userlogg);
    //
    //   }).catch((error) =>
    // {
    //   console.log(error);
    // });
    this.userlogg = localStorage.getItem('USERID');
    this.StatusList = [
      {item_id: 1, item_text: 'Pending'},
      {item_id: 2, item_text: 'Dispatch'},
      {item_id: 3, item_text: 'Cancel'},
    ];
    this.showorders();
  }

  showorders() {
    this.firebaseApp.database().ref('Orders/').once('value')
      .then((snapshot) => {
        this.dataloaded = true;
        const orderArray = Object.keys(snapshot.val()).map((key) => [String(key), snapshot.val()[key]]);
        console.log(orderArray);
        orderArray.forEach(value => {
          value[1].orderkey = value[0];
          this.orderkey.push(value[0]);
          this.orderelements.push(value[1]);
        });
        this.matData = new MatTableDataSource(this.orderelements);
        this.orderelements.forEach(value => {
          console.log(value.orders);
          this.productelements.push(value.orders);
          this.orderprice.push(value.price);
        });
      }).catch((error) => {
      console.log(error);
    });
  }



  close() {
    this.myelementkey = [];
    this.myelementorders = [];
    this.status = [];
    this.modalService.dismissAll();
  }

  // tslint:disable-next-line:no-shadowed-variable
  openModal2(element, modal, i) {
    this.modalService.open(modal, {backdrop: 'static', keyboard: false});
    this.myelementkey.push(element.orderkey);
    this.myelementorders.push(element.orders);
    this.status.push(element.status);
  }

  // tslint:disable-next-line:no-shadowed-variable
  ONStatusSelect(item, element) {
    this.firebaseApp.database().ref('Orders/' + element.orderkey).update({
        status: element.status,
      },
    ).then((res) => {
      console.log('success');
    }).catch((err) => {
      console.log(err);
    });
  }

  // openModal3(element, modal, i) {
  //   this.elementtoproceed = element;
  //   this.modalService.open(modal, {backdrop: 'static', keyboard: false});
  // }

  // proceedreq() {
  //   console.log(this.elementtoproceed);
  //   console.log(this.elementtoproceed.orderkey);
  //   console.log(this.elementtoproceed.orders);
  //   console.log(this.elementtoproceed.price);
  //   console.log(this.elementtoproceed.time);
  //   console.log(this.elementtoproceed.status);
  //   this.modalService.dismissAll();
  //   this.firebaseApp.database().ref('Orders/' + this.elementtoproceed.orderkey).update({
  //       // orders: this.elementtoproceed.orders,
  //       // price: this.elementtoproceed.price,
  //       // time:  this.elementtoproceed.time,
  //       status: this.elementtoproceed.status,
  //     },
  //   ).then((res) => {
  //     console.log('success');
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // }

}
