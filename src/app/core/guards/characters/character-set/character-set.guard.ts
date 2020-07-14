import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take, takeWhile, tap, withLatestFrom } from 'rxjs/operators';

import { getCharacater } from '../../../store/actions/characters.actions';
import { selectCharacter, selectLoadingCharacter } from '../../../store/selectors/characters.selectors';
import { selectRouterState } from '../../../store/selectors/router.selectors';

@Injectable({
    providedIn: 'root'
})
export class CharacterSetGuard implements Resolve<any> {
    constructor(private store: Store) {}

    public resolve(): Observable<any> {
        let id: number;
        this.store
            .select(selectRouterState)
            .pipe(take(1))
            .subscribe(s => (id = Number(s.state.params['id'])));
        return this.store.select(selectCharacter).pipe(
            withLatestFrom(this.store.select(selectLoadingCharacter)),
            filter(([_, loading]) => !loading),
            tap(([_, character]) => {
                if (!character) {
                    this.store.dispatch(
                        getCharacater({
                            id
                        })
                    );
                }
            }),
            takeWhile(([character]) => !character, true)
        );
    }
}
