import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesComicsComponent } from './stories-comics.component';

describe('StoriesComicsComponent', () => {
  let component: StoriesComicsComponent;
  let fixture: ComponentFixture<StoriesComicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoriesComicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesComicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
