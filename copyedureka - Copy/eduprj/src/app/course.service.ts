import {Injectable} from '@angular/core';
import {COURSES} from './mock-courses';
import {Covid} from './covid';
import {Course} from './course';
import {Observable, of} from 'rxjs';
import {ActionService} from './shared/services/actionService';
import {resolve} from '@angular/compiler-cli/src/ngtsc/file_system';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  getCourses(): Observable<Course[]> {
    return of(COURSES);
  }


  constructor() {

  }

  getCovidCountries(): Promise<any> {
    return fetch('https://api.covid19api.com/summary');
  }
}
