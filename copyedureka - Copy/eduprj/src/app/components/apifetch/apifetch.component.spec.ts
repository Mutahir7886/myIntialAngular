import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApifetchComponent } from './apifetch.component';

describe('ApifetchComponent', () => {
  let component: ApifetchComponent;
  let fixture: ComponentFixture<ApifetchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApifetchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApifetchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
