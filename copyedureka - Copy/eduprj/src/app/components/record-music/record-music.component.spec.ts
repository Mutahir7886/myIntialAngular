import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordMusicComponent } from './record-music.component';

describe('RecordMusicComponent', () => {
  let component: RecordMusicComponent;
  let fixture: ComponentFixture<RecordMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
