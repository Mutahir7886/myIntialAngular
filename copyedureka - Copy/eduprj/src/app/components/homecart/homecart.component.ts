import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FirebaseApp} from '@angular/fire';
import {cartarray, myobject} from '../../app.component';
import {Router} from '@angular/router';
import {selectedglobal} from '../../app.component';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {filter as LodashFilter} from 'lodash';
import {userHistoryArray} from '../../app.component';
import {Lightbox} from "ngx-lightbox";

@Component({
  selector: 'app-homecart',
  templateUrl: './homecart.component.html',
  styleUrls: ['./homecart.component.css']
})
export class HomecartComponent implements OnInit {
  Hometempdata: any = [];
  SelectedProduct = false;
  homecartform: FormGroup;
  selecteditems = cartarray;
  quantityitem = 0;
  finalcartobject = {};
  dataloaded: boolean;
  productsArray: any [] = [];
  dispArray = [];
  value1array: any = [];
  constructor(private firebaseApp: FirebaseApp,
              public router: Router,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private lightBox: Lightbox) {
    this.homecartform = this.formBuilder.group({
      Search: [''],
    });
  }

  get Search(): FormControl {
    return this.homecartform.get('Search') as FormControl;
  }

  ngOnInit(): void {
    // this.firebaseApp.database().ref('users/' + localStorage.getItem('USERID')).once('value')
    //   .then((snapshot) => {
    //     console.log('true');
    //     this.userlogged = snapshot.val().FirstName;
    //     console.log(this.userlogged);
    //
    //   }).catch((error) =>
    // {
    //   console.log(error);
    // });
    this.showdata();
    this.Search.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe((value: string) => {
        this.search(value);
      });
  }

  showdata() {
    this.firebaseApp.database().ref('Products/').once('value')
      .then((snapshot) => {
        this.dataloaded = true;
        const tempArray = Object.keys(snapshot.val()).map((key) => [Number(key), snapshot.val()[key]]);
        for (const obj of tempArray) {
          this.Hometempdata.push(obj[1]);
        }
        // this.Hometempdata = snapshot.val().filter(value => {
        //   return value;
        // });
        const ids = cartarray.map(item => item.PrId);
        if (ids.length > 0) {
          this.Hometempdata.forEach(element => {
            if (ids.indexOf(element.PrId) > -1) {
              element.isSelected = true;
            }
          });
        }
        this.dispArray = this.Hometempdata;
      }).catch((error) => {
      console.log(error);
    });
  }

  addtocart(item) {
    item.isSelected = true;
    // tslint:disable-next-line:no-non-null-assertion
    if (cartarray.indexOf(item) > -1) {
      item.quantityitem = item.quantityitem + 1;
      this.toastr.show('quantity increased ');

    } else {
      this.toastr.show('Product has been added');
      item.quantityitem = 1;
      cartarray.push(item);
    }
    // this.quantityitem = 0;
    // this.finalcartobject = {Products: item , Quantity_item : this.quantityitem };
    // this.selecteditems.push(item);
    // cartarray.push(item);
  }

  viewcart() {
    this.router.navigate(['/cartselected']);
  }

  removefromcart(item) {
    item.isSelected = false;
    // this.selecteditems.splice(this.selecteditems.indexOf(item), 1);
    cartarray.splice(cartarray.indexOf(item), 1);
  }

  quantity() {

    this.quantityitem = this.quantityitem + 1;
  }

  search(searchValue: string) {
    console.log('check this.Hometempdata',this.Hometempdata)
    if (!searchValue) {
      this.dispArray = this.Hometempdata;
      return;
    }
    // console.log(searchValue);
    // this.Hometempdata.forEach(value => {
    //   this.productsArray.push(value.ProductName);
    // });
    // console.log(this.productsArray);
    //    const tempArray = this.Hometempdata.map(item => item.ProductName.toLowerCase());
    // tslint:disable-next-line:max-line-length
    this.dispArray = LodashFilter(this.Hometempdata, function (o) {
      return o.ProductName.toLowerCase().includes(searchValue.toLowerCase());
    });
    // console.log(indexs);
    //    console.log(tempArray.indexOf(searchValue.toLowerCase()));
    // if (tempArray.indexOf(searchValue.toLowerCase()) > -1 )
    // {
    //   this.dispArray = [this.Hometempdata[tempArray.indexOf(searchValue.toLowerCase())]];
    //   console.log('yes');
    // }
    // else {
    //   this.dispArray = [];
    // }
  }

  showhistory() {
    this.router.navigate(['/userhis']);
    // const currentuid = JSON.parse()
    // this.firebaseApp.database().ref('userHistory/' + localStorage.getItem('USERID') + '/').once('value')
    //   .then((snapshot) => {
    //     this.dataloaded = true;
    //     console.log('retrieved data');
    //     console.log(snapshot.val());
    //     const checkarray = Object.keys(snapshot.val()).map((key) => [String(key), snapshot.val()[key]]);
    //     console.log(checkarray);
    //     checkarray.forEach(value => {
    //       this.value1array.push(value[1]);
    //     });
    //     console.log(this.value1array);
    //     userHistoryArray.push(this.value1array);
    //   }).catch((error) => {
    //   console.log(error);
    // });
  }

  showuserdetails() {
    this.router.navigate(['/userprofile']);
  }

  openImage(imgSrc): void {
    const img = [
      {
        src: imgSrc,
        thumb: ''
      }
    ];
    this.lightBox.open(img);
  }
}
