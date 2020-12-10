import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {variable} from '@angular/compiler/src/output/output_ast';
import {FirebaseApp} from '@angular/fire';
import {MatTableDataSource} from '@angular/material/table';
import {PeriodicElement} from '../../finalform/finalform.component';
import {type} from 'os';
import {Lightbox} from 'ngx-lightbox';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  matData: MatTableDataSource<any>;
  indextodelete: -1;
  tempData = [];
  prodIDtoDelete: -1;
  productindextoedit: -1;
  displayedColumns = ['PrID', 'ProductName', 'ProductPrice',
    'Image', 'action'];
  ProductsformGroup: FormGroup;
  imageValue: any;
  checkImmage: any;
  formGroup: FormGroup;
  datauploading = false;
  tabledataexists: any;
  dataloaded: boolean;

  constructor(private modalService: NgbModal,
              private lightBox: Lightbox,
              private formBuilder: FormBuilder,
              private firebaseApp: FirebaseApp) {
    this.ProductsformGroup = this.formBuilder.group({
      PrID: [''],
      ProductName: [''],
      ProductPrice: [''],
      Image: [''],
      Description: ['']
    });
    this.showdata();
  }

  openImg(imgSrc): void {
    const img = [
      {
        src: imgSrc,
        thumb: ''
      }
    ];
    this.lightBox.open(img);
  }

  get PrID(): FormControl {
    return this.ProductsformGroup.get('PrID') as FormControl;
  }

  get ProductName(): FormControl {
    return this.ProductsformGroup.get('ProductName') as FormControl;
  }

  get ProductPrice(): FormControl {
    return this.ProductsformGroup.get('ProductPrice') as FormControl;
  }

  get Image(): FormControl {
    return this.ProductsformGroup.get('Image') as FormControl;
  }

  get Description(): FormControl {
    return this.ProductsformGroup.get('Description') as FormControl;
  }

  ngOnInit(): void {
  }

  submit(formgroup): void {
    this.datauploading = true;
    // let vaiable = JSON.parse(localStorage.getItem('Products'));
    // if (!vaiable) {
    //   console.log('first');
    //   vaiable = [];
    // }
    // vaiable.push({
    //   ProductName: formgroup.value.ProductName,
    //   ProductPrice: formgroup.value.ProductPrice,
    //   Image: formgroup.value.Image,
    //   Description: formgroup.value.Description
    // });
    // console.log(vaiable);
    // localStorage.setItem('Products', JSON.stringify(vaiable));
    this.firebaseApp.database().ref('Products/' + formgroup.value.PrID).set({
      ProductName: formgroup.value.ProductName,
      ProductPrice: formgroup.value.ProductPrice,
      Image: formgroup.value.Image,
      Description: formgroup.value.Description,
      PrId: formgroup.value.PrID
    }).then((res) => {
      console.log('success');
      this.firebaseApp.database().ref('Products/').once('value')
        .then((snapshot) => {
          if (!snapshot.val()) {
            alert('no present');
          }
          console.log(snapshot.val());
          // tslint:disable-next-line:only-arrow-functions typedef
          // this.tempdata = snapshot.val().filter(function(item){
          //   return item;
          // });
          this.tempData = [];
          const tempArray1 = Object.keys(snapshot.val()).map((key) => [Number(key), snapshot.val()[key]]);
          for (const obj of tempArray1) {
            this.tempData.push(obj[1]);
          }

          // this.tempdata = tempArray.filter(function(item){
          //   return item[1];
          // });
          // this.tempdata = snapshot.val().slice(1, snapshot.val().length);

          this.matData = new MatTableDataSource(this.tempData);
          this.datauploading = false;
          this.modalService.dismissAll();
        }).catch((error) => {
        console.log('error in database info get');
        this.datauploading = false;
        console.log(error);
      });
    }).catch((err) => {
      this.datauploading = false;
      console.log('error in database ');
      console.log(err);
    });
    // this.matData = new MatTableDataSource(JSON.parse(localStorage.getItem('Products')));
    // this.firebaseApp.database().ref('Products/').once('value')f
    //   .then((snapshot) => {
    //     console.log(snapshot.val());
    //     this.matData = new MatTableDataSource(snapshot.val().slice(1, snapshot.val().length));
    //   }).catch((error) =>
    // {
    //   console.log(error);
    // });
    // this.matData = new MatTableDataSource();
    // this.ProductsformGroup.reset();
    this.Image.setValue('');
    this.ProductName.setValue('');
    this.ProductPrice.setValue('');
    this.Description.setValue('');
    this.PrID.setValue('');
  }

  ModelEditor(modal) {
    this.modalService.open(modal, {backdrop: 'static', keyboard: false});
  }

  readUrl(files: any) {
    let mimeType;
    let file;
    if (files.target) {
      if (files.target.files.length === 0) {
        return;
      }
      // Image upload validation
      mimeType = files.target.files[0].type;
      file = files.target.files[0];
    } else {
      mimeType = files.type;
      file = files;
    }
    if (mimeType.match(/image\/*/) == null) {
      // this.toaster.error('Wrong Image selected');
      return;
    }

    // Image upload
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imageValue = reader.result;
      this.Image.setValue(this.imageValue);
    };
  }

  showdata() {
    this.firebaseApp.database().ref('Products/').once('value')
      .then((snapshot) => {
        this.dataloaded = true;
        const tempArray = Object.keys(snapshot.val()).map((key) => [Number(key), snapshot.val()[key]]);
        for (const obj of tempArray) {
          this.tempData.push(obj[1]);
        }

        // this.tempdata = tempArray.filter(function(item){
        //   return item[1];
        // });
        // this.tempdata = snapshot.val().slice(1, snapshot.val().length);
        this.matData = new MatTableDataSource(this.tempData);
      }).catch((error) => {
      console.log(error);
    });
  }


  openModal2(element, modal, i) {
    this.prodIDtoDelete = element.PrId;
    this.modalService.open(modal, {backdrop: 'static', keyboard: false});
    this.indextodelete = i;
  }

  removeIt() {
    this.firebaseApp.database().ref('Products/' + this.prodIDtoDelete).remove().then((result) => {
      this.tempData.splice(this.indextodelete, 1);
      this.matData = new MatTableDataSource(this.tempData);
      this.modalService.dismissAll();
    }).catch((error) => {
      console.log(error);
    });
  }

  openModal3(element, modal, i) {
    this.ProductsformGroup.get('ProductName').setValue(element.ProductName);
    this.ProductsformGroup.get('PrID').setValue(element.PrId);
    this.ProductsformGroup.get('ProductPrice').setValue(element.ProductPrice);
    this.ProductsformGroup.get('Image').setValue(element.Image);
    this.ProductsformGroup.get('Description').setValue(element.Description);
    this.productindextoedit = i;
    this.modalService.open(modal, {backdrop: 'static', keyboard: false});
  }

  savechanges() {


    this.tempData[this.productindextoedit] = {
      Description: this.Description.value,
      Image: this.Image.value,
      PrId: this.PrID.value,
      ProductName: this.ProductName.value,
      ProductPrice: this.ProductPrice.value
    };
    this.matData = new MatTableDataSource(this.tempData);
    this.firebaseApp.database().ref('Products/' + this.PrID.value).update({
        Description: this.Description.value,
        Image: this.Image.value,
        PrId: this.PrID.value,
        ProductName: this.ProductName.value,
        ProductPrice: this.ProductPrice.value
      },
    ).then((res) => {
      console.log('success');
    }).catch((err) => {
      console.log(err);
    });
    this.Image.setValue('');
    this.ProductName.setValue('');
    this.ProductPrice.setValue('');
    this.Description.setValue('');
    this.PrID.setValue('');
    this.modalService.dismissAll();
  }

  noNegative($event: KeyboardEvent): boolean {
    // tslint:disable-next-line:triple-equals
    console.log($event.key.charCodeAt(0));
    return $event.key.charCodeAt(0) !== 45;

  }

  closeedit() {
    this.modalService.dismissAll();
    this.Image.setValue('');
    this.ProductName.setValue('');
    this.ProductPrice.setValue('');
    this.Description.setValue('');
    this.PrID.setValue('');
  }
}
