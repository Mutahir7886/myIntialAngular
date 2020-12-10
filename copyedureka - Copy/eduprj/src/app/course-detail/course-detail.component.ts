import {Pipe, PipeTransform} from '@angular/core';

import {Course} from '../course';
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {COURSES} from '../mock-courses';
// import {COVID} from '../covid-data';

@Pipe({name: 'uselesspipe'})
export class uselessPipe implements PipeTransform {
  transform(value: number, exponent?: number): number {
    return Math.pow(value, isNaN(exponent) ? 1 : exponent);
  }
}

@Pipe({name: 'additionPipe'})
export class additionPipe implements PipeTransform {
  transform(value: number): number {
    return value + 2;
  }
}

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  @Input() course: Course;
  @Output() btnClick: EventEmitter<string>;
  courses = [];
  covid = [];
  // COVIDD = COVID;

  constructor(private activatedRoute: ActivatedRoute) {
    this.btnClick = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this.courses = COURSES;

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      console.log(params);
      this.courses.forEach(element => {
        // tslint:disable-next-line:triple-equals
        if (element.id == id) {
          this.course = element;
        }
      });
    });
  }

  callevent(value): void {
    this.btnClick.emit(value);


  }
}
