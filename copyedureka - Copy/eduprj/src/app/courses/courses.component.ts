import {Pipe, PipeTransform} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {Course} from '../course';
import {COURSES} from '../mock-courses';
import {CourseService} from './../course.service';
import {ActionService} from '../shared/services/actionService';
// import {COVID} from '../covid-data';
import {Covid} from '../covid';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  heading = 'Courses at Edureka';
  // course=COURSES;
  course: Course[];
  covid: Covid[];
  selectedCourse: Course;
  chkproperty;
  // covid = COVID;

  constructor(private CourseService: CourseService, public actionService: ActionService) {
    this.getCovid();
  }

  ngOnInit(): void {
    this.getCourses();
    this.actionService.getAction().subscribe(val => {
      console.log('in subscriber', val);
    });
    this.heading = 'Courses at Edureka';
  }

  onSelect(course: Course): void {
    this.selectedCourse = course;

  }

  getCourses(): void {
    this.CourseService.getCourses().subscribe(course => this.course = course);
  }

  getCovid(): void {

    // this.CourseService.getCovid().subscribe(covid => this.covid = covid);
  }

  eventListener(event): void {
    console.log(event);
    this.chkproperty = event;
  }


  getDate() {
    return new Date();
  }

  publishData(number: any) {
    this.actionService.publishValue(number);
  }

  CHK() {

    // console.log(COVID);

  }
}
