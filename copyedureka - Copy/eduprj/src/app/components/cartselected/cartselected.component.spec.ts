import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartselectedComponent } from './cartselected.component';

describe('CartselectedComponent', () => {
  let component: CartselectedComponent;
  let fixture: ComponentFixture<CartselectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartselectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartselectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
