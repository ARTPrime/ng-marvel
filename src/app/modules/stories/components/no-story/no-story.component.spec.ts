import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoStoryComponent } from './no-story.component';

describe('NoStoryComponent', () => {
  let component: NoStoryComponent;
  let fixture: ComponentFixture<NoStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
