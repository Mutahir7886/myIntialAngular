import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  selector: 'app-myelementtable',
  templateUrl: './myelementtable.component.html',
  styleUrls: ['./myelementtable.component.css']
})
export class MyelementtableComponent implements OnInit {
   displayedColumns: string[] = ['name', 'weight', 'symbol', 'action', 'action2'];
  // columnsToDisplay: string[] = this.displayedColumns.slice();
  data: PeriodicElement[] = ELEMENT_DATA;
  matData = new MatTableDataSource(this.data);
  name;
  weight;
  sybmol;


  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  addITem() {

    this.data.push({position: 11, name: this.name, weight: this.weight, symbol: this.sybmol});
    this.matData = new MatTableDataSource(this.data);

  }

  removeIt(i: any) {
    this.data.splice(i, 1);
    this.matData = new MatTableDataSource(this.data);

  }

  editIt(element, i) {
    element.name = this.name;
    element.weight = this.weight;
    element.symbol = this.sybmol;
    this.data[i] = element;
    this.matData = new MatTableDataSource(this.data);

  }

  openModal(modal) {
    this.modalService.open(modal, {backdrop: 'static', keyboard: false});
  }
  ModelEditor(modal, element, i){
    element.name = this.name;
    element.weight = this.weight;
    element.symbol = this.sybmol;
    this.data[i] = element;
    this.matData = new MatTableDataSource(this.data);
    this.modalService.open(modal, {backdrop: 'static', keyboard: false});
  }
}
