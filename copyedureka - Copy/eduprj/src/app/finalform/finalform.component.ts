import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-finalform',
  templateUrl: './finalform.component.html',
  styleUrls: ['./finalform.component.css']
})
export class FinalformComponent implements OnInit {


  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.formGroup = this.formBuilder.group({
      namee: ['', [Validators.required, Validators.maxLength(12)]],
      weightt: [0, [Validators.required]],
      symboll: [0, Validators.required],
    });
  }
  get namee(): FormControl {
    return this.formGroup.get('namee') as FormControl;
  }
  get weightt(): FormControl
  {
    return this.formGroup.get('weightt') as FormControl;
  }
  get symboll(): FormControl
  {
    return this.formGroup.get('symboll') as FormControl;
  }
  displayedColumns: string[] = ['name', 'weight', 'symbol', 'action'];
  data: PeriodicElement[] = ELEMENT_DATA;
  formGroup: FormGroup;

  matData = new MatTableDataSource(this.data);
  name;
  weight;
  sybmol;
  indexToEdit = -1;
  indextodelete=-1;

  ngOnInit(): void {
  }
  submit() {
    console.log('email is ', this.namee.value);
    console.log('points are ', this.weightt.value);
    console.log('quanity is ', this.symboll.value);
    this.data[this.indexToEdit] = {position: this.indexToEdit, name: this.namee.value, weight: this.weightt.value, symbol: this.symboll.value};
    this.matData = new MatTableDataSource(this.data);
    console.log(this.data);
    this.modalService.dismissAll();
    this.toastr.show('DATA HAS BEEN UPDATED');

  }

  addITem() {

    this.data.push({position: 11, name: this.name, weight: this.weight, symbol: this.sybmol});
    this.matData = new MatTableDataSource(this.data);

  }

  removeIt() {
    this.data.splice(this.indextodelete, 1);
    this.matData = new MatTableDataSource(this.data);
    this.modalService.dismissAll();
    this.toastr.success('DATA HAS BEEN DELETED');
  }

  editIt(element, i) {
    element.name = this.namee.value;
    element.weight = this.weightt.value;
    element.symbol = this.symboll.value;
    this.data[i] = element;
    this.matData = new MatTableDataSource(this.data);

  }

  openModal(modal) {
    this.modalService.open(modal, {backdrop: 'static', keyboard: false});
  }
  openModal2(modal, i) {
    this.modalService.open(modal, {backdrop: 'static', keyboard: false});
    this.indextodelete = i;
  }
  ModelEditor(modal, element, i){
    this.formGroup.get('namee').setValue(element.name);
    this.formGroup.get('weightt').setValue(element.weight);

    this.formGroup.get('symboll').setValue(element.symbol);
    // element.name = this.namee.value;
    // element.weight = this.weightt.value;
    // element.symbol = this.symboll.value;
    // this.data[i] = element;
    this.indexToEdit = i;
    // console.log(this.data[i]);
    // this.matData = new MatTableDataSource(this.data);
    this.modalService.open(modal, {backdrop: 'static', keyboard: false});

  }

  ceeeck() {
    console.log(this.data);
  }
}
