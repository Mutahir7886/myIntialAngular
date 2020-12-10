import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../services/http.service';
import {apiUrls} from '../../environments/apis/api.urls';
import {Router} from "@angular/router";

@Component({
  selector: 'app-zaitoon',
  templateUrl: './zaitoon.component.html',
  styleUrls: ['./zaitoon.component.css'],

})
export class ZaitoonComponent implements OnInit {
  formGroup1: FormGroup;
  formGroup: FormGroup;
  myobject: any;
  showProducts = false;
  ProductList: any = [];
  ProductList1: any = [];
  email: string;
  username: string;
  productListHeadings: any = [];

  constructor(private formBuilder: FormBuilder,
              private httpService: HttpService,
              private router: Router) {
    this.formGroup1 = this.formBuilder.group({
      name: ['', [Validators.required]],
      region: ['', [Validators.required]],
      area: ['', [Validators.required]],
      location: ['', [Validators.required]],
      zone: ['', [Validators.required]],
      storeName: ['', [Validators.required]],
      ownerName: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      storeCategoryName: ['', [Validators.required]],
      visitImage: ['', [Validators.required]],
      competing_brands: ['', [Validators.required]],
      recommended_products: ['', [Validators.required]],
      notes: ['', [Validators.required]],
      productQuantity: this.formBuilder.array([]),
      productIds: ['']
    });
    this.formGroup = this.formBuilder.group({
      productName: ['', [Validators.required]],
    });
    this.email = localStorage.getItem('zaitoonEmail');
    this.username = localStorage.getItem('zaitoonUsername');
  }

  ngOnInit(): void {
    this.httpService.get(apiUrls.getProducts).subscribe(data => {
      console.log(data);
      this.ProductList = [];
      data.forEach(value => {
        this.ProductList.push({item_id: value.id, item_text: value.name});
      });
      console.log('ngSelect', this.ProductList);
    }, error => {

    });
  }

  get productQuantity(): FormArray {
    return this.formGroup1.get('productQuantity') as FormArray;
  }


  addProductVisit(): FormGroup {

    return this.formBuilder.group({
      productQuantity: [''],
    });
  }

  submit(formGroup1: FormGroup): void {
    console.log(formGroup1.value);
    console.log(this.productQuantity);
    formGroup1.value.productIds.forEach((value, index) => {
      this.ProductList1.push({id: value, quantity: formGroup1.value.productQuantity[index].productQuantity});
    });
    this.myobject = {
      city: {
        name: formGroup1.value.name,
        region: formGroup1.value.region,
        area: formGroup1.value.area,
        location: formGroup1.value.location,
        zone: formGroup1.value.zone
      },
      visit_image: formGroup1.value.visitImage,
      store: {
        name: formGroup1.value.storeName,
        owner_name: formGroup1.value.ownerName,
        contact: formGroup1.value.contact,
        store_category: {name: formGroup1.value.storeCategoryName}
      },
      products: this.ProductList1,
      additional_info: {
        competing_brands: formGroup1.value.competing_brands,
        recommended_products: formGroup1.value.recommended_products,
        notes: formGroup1.value.notes,
      },
      user_visited: {
        username: this.username,
        email: this.email
      }
    };
    console.log(this.myobject);
    // this.httpService.post(apiUrls.newvisit, this.myobject).subscribe(data => {
    //   console.log(data);
    // }, error => {
    // });
    this.formGroup1.reset();
    while (this.productQuantity.length !== 0) {
      this.productQuantity.removeAt(0);
    }
    this.productListHeadings = [];
  }

  addProducts(): void {
    // this.showProducts = true;
    // this.products.push(this.addProductVisit());
  }

  OnProductSelect($event: any): void {
    this.productListHeadings.push($event.item_text);
    console.log(this.productListHeadings);
    console.log(this.productQuantity);

    this.productQuantity.push(this.addProductVisit());

  }

  OnProductRemove($event: any): void {
    console.log($event);
    console.log($event.index);
    this.productListHeadings.forEach((value, index) => {
      if (value === $event.label) {
        console.log('required index', index);
        this.productQuantity.removeAt(index);
        this.productListHeadings.splice(index, 1);
      }
    });
  }

  submitProducts(formGroup: FormGroup): void {
    console.log(formGroup);
  }

  logout(): void {
    this.httpService.post(apiUrls.signout, {}).subscribe(data => {
      console.log(data);
      localStorage.removeItem('zaitoonEmail');
      localStorage.removeItem('zaitoonUsername');
      localStorage.removeItem('zaitoonToken');
      this.router.navigate(['/login']);
    }, error => {

    });

  }
}
