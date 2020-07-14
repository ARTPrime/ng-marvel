import { TestBed } from '@angular/core/testing';

import { StoryComicsGuard } from './story-comics.guard';

describe('StoryComicsGuard', () => {
  let guard: StoryComicsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StoryComicsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
