import {Component, OnInit, Input} from '@angular/core';
import {Course} from '../course';
import {COURSES} from '../mock-courses';
import {CourseService} from './../course.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  course: Course[];
  selectedCourse: Course;
  emaill: any;
  passwordd: any;
  UserImage: File;
  formGroup: FormGroup;
  isExists = false;

  constructor(private courseService: CourseService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCourses();
  }

  onSelect(course: Course): void {
    this.selectedCourse = course;

  }

  getCourses(): void {
    this.courseService.getCourses().subscribe(course => this.course = course);

  }

  get email(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }
  get userimage(): FormControl {
    return this.formGroup.get('image') as FormControl;
  }

  submit(form) {
    console.log('email is ', this.email.value);
    console.log('password is ', this.password.value);
    console.log('password is ', this.userimage.value);

    this.isExists = true;
    console.log(form.value);
  }

}
