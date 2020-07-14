import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoComicComponent } from './no-comic.component';

describe('NoComicComponent', () => {
  let component: NoComicComponent;
  let fixture: ComponentFixture<NoComicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoComicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
