import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalformComponent } from './finalform.component';

describe('FinalformComponent', () => {
  let component: FinalformComponent;
  let fixture: ComponentFixture<FinalformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
