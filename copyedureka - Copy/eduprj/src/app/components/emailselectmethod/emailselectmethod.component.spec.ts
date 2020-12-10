import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailselectmethodComponent } from './emailselectmethod.component';

describe('EmailselectmethodComponent', () => {
  let component: EmailselectmethodComponent;
  let fixture: ComponentFixture<EmailselectmethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailselectmethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailselectmethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
