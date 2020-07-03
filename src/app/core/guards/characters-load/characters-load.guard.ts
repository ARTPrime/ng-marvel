import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, takeWhile, tap, withLatestFrom } from 'rxjs/operators';

import { getCharacaters } from '../../store/actions/characters.actions';
import { selectCharacters, selectLoadingCharacters } from '../../store/selectors/characters.selectors';

@Injectable({
    providedIn: 'root'
})
export class CharactersLoadGuard implements Resolve<any> {
    constructor(private store: Store<{}>) {}

    public resolve(): Observable<any> {
        return this.store.select(selectCharacters).pipe(
            withLatestFrom(this.store.select(selectLoadingCharacters)),
            filter(([, loading]) => !loading),
            tap(([characters]) => {
                if (!characters) {
                    this.store.dispatch(getCharacaters());
                }
            }),
            takeWhile(([characters]) => !characters, true)
        );
    }
}
