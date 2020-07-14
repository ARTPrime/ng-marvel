import { TestBed } from '@angular/core/testing';

import { ComicCharactersGuard } from './comic-characters.guard';

describe('ComicCharactersGuard', () => {
  let guard: ComicCharactersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ComicCharactersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
