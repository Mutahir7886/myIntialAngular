import {Component, OnInit} from '@angular/core';
import {cartarray, userHistoryArray} from "../../app.component";
import {FirebaseApp} from "@angular/fire";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-userhis',
  templateUrl: './userhis.component.html',
  styleUrls: ['./userhis.component.css']
})
export class UserhisComponent implements OnInit {
  userhiss = userHistoryArray;
  value1array: any = [];
  val1: any = [];
  finaltable: any = [];
  displayedColumns: string[] = ['OrderID', 'OrderPrice', 'OrderStatus', 'Time', 'Details'];
  matData: MatTableDataSource<any>;
  Myuserelements: any = [];

  constructor(private firebaseApp: FirebaseApp) {
  }

  ngOnInit(): void {
    this.showhistory();
  }

  showhistory() {
    this.firebaseApp.database().ref('userHistory/' + localStorage.getItem('USERID') + '/').once('value')
      .then((snapshot) => {
        // this.dataloaded = true;
        const checkarray = Object.keys(snapshot.val()).map((key) => [String(key), snapshot.val()[key]]);
        console.log(checkarray);
        checkarray.forEach(value => {
          this.value1array.push(value[1]);
        });
        this.value1array.forEach(value => {
          console.log(value.orderID);
          this.firebaseApp.database().ref('Orders/' + value.orderID).once('value')
            .then((snapshot) => {
              let obj = snapshot.val();
              obj.orderID = value.orderID;
              this.finaltable.push(obj);
              this.matData = new MatTableDataSource(this.finaltable);
            }).catch((error) => {
            console.log(error);
          });
        });
      }).catch((error) => {
      console.log(error);
    });
  }
}
