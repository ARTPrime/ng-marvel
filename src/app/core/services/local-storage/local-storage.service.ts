import { Injectable } from '@angular/core';

const APP_PREFIX = 'MV-';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    public static loadInitialState(): any {
        return Object.keys(localStorage).reduce((state: any, storageKey) => {
            if (storageKey.includes(APP_PREFIX)) {
                const stateKeys = storageKey
                    .replace(APP_PREFIX, '')
                    .toLowerCase()
                    .split('.')
                    .map(key =>
                        key
                            .split('-')
                            .map((token, index) =>
                                index === 0 ? token : token.charAt(0).toLowerCase() + token.slice(1)
                            )
                            .join('')
                    );
                let currentStateRef = state;
                stateKeys.forEach((key, index) => {
                    if (index === stateKeys.length - 1) {
                        currentStateRef[key] = JSON.parse(localStorage.getItem(storageKey));
                        return;
                    }
                    currentStateRef[key] = currentStateRef[key] || {};
                    currentStateRef = currentStateRef[key];
                });
            }
            return state;
        }, {});
    }

    public setItem(key: string, value: any): void {
        localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
    }

    public getItem(key: string): string {
        return JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`));
    }

    public removeItem(key: string): void {
        localStorage.removeItem(`${APP_PREFIX}${key}`);
    }

    /** Tests that localStorage exists, can be written to, and read from. */
    public testLocalStorage(): void {
        const testValue = 'testValue';
        const testKey = 'testKey';
        let retrievedValue: string;
        const errorMessage = 'localStorage did not return expected value';

        this.setItem(testKey, testValue);
        retrievedValue = this.getItem(testKey);
        this.removeItem(testKey);

        if (retrievedValue !== testValue) {
            throw new Error(errorMessage);
        }
    }
}
