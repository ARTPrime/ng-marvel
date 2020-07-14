import { TestBed } from '@angular/core/testing';

import { CharacterSetGuard } from './character-set.guard';

describe('CharacterSetGuard', () => {
    let guard: CharacterSetGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(CharacterSetGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
