import { TestBed } from '@angular/core/testing';

import { StoryCharactersGuard } from './story-characters.guard';

describe('StoryCharactersGuard', () => {
  let guard: StoryCharactersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StoryCharactersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
