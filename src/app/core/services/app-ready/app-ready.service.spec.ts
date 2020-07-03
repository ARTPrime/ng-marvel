import { TestBed } from '@angular/core/testing';

import { AppReadyService } from './app-ready.service';

describe('AppReadyService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: AppReadyService = TestBed.get(AppReadyService);
        expect(service).toBeTruthy();
    });
});
