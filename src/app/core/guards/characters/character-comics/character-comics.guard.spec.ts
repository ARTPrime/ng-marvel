import { TestBed } from '@angular/core/testing';

import { CharacterComicsGuard } from './character-comics.guard';

describe('CharacterComicsGuard', () => {
  let guard: CharacterComicsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CharacterComicsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
