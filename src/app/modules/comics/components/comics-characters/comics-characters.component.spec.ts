import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsCharactersComponent } from './comics-characters.component';

describe('ComicsCharactersComponent', () => {
  let component: ComicsCharactersComponent;
  let fixture: ComponentFixture<ComicsCharactersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicsCharactersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
