import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsStoriesComponent } from './comics-stories.component';

describe('ComicsStoriesComponent', () => {
  let component: ComicsStoriesComponent;
  let fixture: ComponentFixture<ComicsStoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicsStoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
