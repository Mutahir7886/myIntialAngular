import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserhisComponent } from './userhis.component';

describe('UserhisComponent', () => {
  let component: UserhisComponent;
  let fixture: ComponentFixture<UserhisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserhisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserhisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
