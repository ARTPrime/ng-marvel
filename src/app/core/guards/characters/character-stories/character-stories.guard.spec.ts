import { TestBed } from '@angular/core/testing';

import { CharacterStoriesGuard } from './character-stories.guard';

describe('CharacterStoriesGuard', () => {
  let guard: CharacterStoriesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CharacterStoriesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
