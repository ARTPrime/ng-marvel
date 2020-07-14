import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesCharactersComponent } from './stories-characters.component';

describe('StoriesCharactersComponent', () => {
  let component: StoriesCharactersComponent;
  let fixture: ComponentFixture<StoriesCharactersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoriesCharactersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
