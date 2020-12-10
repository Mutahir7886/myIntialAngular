import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyelementtableComponent } from './myelementtable.component';

describe('MyelementtableComponent', () => {
  let component: MyelementtableComponent;
  let fixture: ComponentFixture<MyelementtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyelementtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyelementtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
