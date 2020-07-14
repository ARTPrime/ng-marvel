import { TestBed } from '@angular/core/testing';

import { CharactersLoadGuard } from './characters-load.guard';

describe('CharactersLoadGuard', () => {
  let guard: CharactersLoadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CharactersLoadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
