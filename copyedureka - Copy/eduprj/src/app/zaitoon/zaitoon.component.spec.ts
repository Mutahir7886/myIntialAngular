import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaitoonComponent } from './zaitoon.component';

describe('ZaitoonComponent', () => {
  let component: ZaitoonComponent;
  let fixture: ComponentFixture<ZaitoonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZaitoonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaitoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
