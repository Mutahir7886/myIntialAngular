import {Component, OnInit} from '@angular/core';
// import {COVID} from '../../covid-data';
import {Covid} from '../../covid';
import {CourseService} from '../../course.service';

@Component({
  selector: 'app-apifetch',
  templateUrl: './apifetch.component.html',
  styleUrls: ['./apifetch.component.css']
})
export class ApifetchComponent implements OnInit {
  covid: Covid[];

  constructor(private courseService: CourseService) {
    this.getCovid();
  }

  ngOnInit(): void {
    this.getCovid();

  }

  getCovid(): void {
    this.courseService.getCovidCountries().then(res => res.json())
      .then(resjson => {
        console.log(resjson.Countries.slice(0,100));
         this.covid = resjson.Countries;
      })
      .catch(error => {
      });


    // this.courseService.getCovid().subscribe(covid => this.covid = covid);
  }

  CHK() {

    // console.log(COVID);

  }

  onScrollDown() {
    console.log('Scrolled Down');
  }


  onScrollUp() {
    console.log('Scrolled Up');
  }
}
