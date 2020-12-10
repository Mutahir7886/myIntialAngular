import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypipesComponent } from './mypipes.component';

describe('MypipesComponent', () => {
  let component: MypipesComponent;
  let fixture: ComponentFixture<MypipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
