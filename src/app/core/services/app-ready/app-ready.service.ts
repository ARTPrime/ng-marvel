import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

/** @dynamic */
@Injectable({ providedIn: 'root' })
export class AppReadyService {
    private isAppReady = false;

    constructor(@Inject(DOCUMENT) private document) {}

    /**
     * Triggers the appready event on the document during document load
     */
    public trigger(): void {
        if (this.isAppReady) {
            return;
        }

        const appReadyEvent = new CustomEvent('appready', {
            bubbles: true,
            cancelable: false
        });
        this.document.dispatchEvent(appReadyEvent);
        this.isAppReady = true;
    }
}
