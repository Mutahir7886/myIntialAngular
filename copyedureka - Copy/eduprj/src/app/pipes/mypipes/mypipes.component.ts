import { Component, OnInit } from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'expoPipe'})
export class expoPipe implements PipeTransform {
  transform(value: number, exponent?: number): number {
    return Math.pow(value, isNaN(exponent) ? 1 : exponent);
  }
}

@Pipe({name: 'addPipe'})
export class addPipe implements PipeTransform {
  transform(value: number): number {
    return value + 2;
  }
}

@Component({
  selector: 'app-mypipes',
  templateUrl: './mypipes.component.html',
  styleUrls: ['./mypipes.component.css']
})
export class MypipesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
