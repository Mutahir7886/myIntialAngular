import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailselectComponent } from './emailselect.component';

describe('EmailselectComponent', () => {
  let component: EmailselectComponent;
  let fixture: ComponentFixture<EmailselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
