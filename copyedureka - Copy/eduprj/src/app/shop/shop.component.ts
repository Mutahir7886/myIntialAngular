import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(12)]],
      points: [0, [Validators.required]],
      quantity: [0, Validators.required],
      quantity_check: [false],
      Expire_date: [0],
      image: ['', Validators.required], date: ['', Validators.required],
    });
    this.quantity_check.valueChanges.subscribe((value: boolean) => {
      value ? this.quantity.enable() : this.quantity.disable();
    });
  }

  min: string;
  imageValue: any;
  isExxists = false;

  ngOnInit(): void {
    const currentDay = new Date().getDate();
    let currentDayString = currentDay.toString();
    const currentMonth = new Date().getMonth() + 1; // January is 0
    let currentMonthString = currentMonth.toString();
    const currentYear = new Date().getFullYear();
    const currentYearString = currentYear.toString();
    if (currentDay < 10){
      currentDayString = '0' + currentDay;
    }
    if (currentMonth < 10){
      currentMonthString = '0' + currentMonth;

    }

    this.min = currentYearString + '-' + currentMonthString + '-' + currentDayString;
  }

  get title(): FormControl {
    return this.formGroup.get('title') as FormControl;
  }

  get points(): FormControl {
    return this.formGroup.get('points') as FormControl;
  }

  get quantity(): FormControl {
    return this.formGroup.get('quantity') as FormControl;
  }

  get expire_date(): FormControl {
    return this.formGroup.get('Expire_date') as FormControl;
  }

  get image(): FormControl {
    return this.formGroup.get('image') as FormControl;
  }

  get quantity_check(): FormControl {
    return this.formGroup.get('quantity_check') as FormControl;
  }


  submit(form) {
    console.log('email is ', this.title.value);
    console.log('points are ', this.points.value);
    console.log('quanity is ', this.quantity.value);
    console.log('expire date is ', this.min);
    console.log('image path is ', this.image.value);
    this.isExxists = true;
    console.log(form.value);

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
      console.log('yes');
      this.imageValue = reader.result;
      this.image.setValue(this.imageValue);
    };
  }

}
