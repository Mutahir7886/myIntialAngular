import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectbyuserComponent } from './selectbyuser.component';

describe('SelectbyuserComponent', () => {
  let component: SelectbyuserComponent;
  let fixture: ComponentFixture<SelectbyuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectbyuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectbyuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
