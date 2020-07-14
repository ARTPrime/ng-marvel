import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, startWith, take, takeWhile, tap, withLatestFrom } from 'rxjs/operators';

import { getCharacterComics } from '../../../store/actions/characters.actions';
import { selectCharacterComics, selectLoadingCharacterComics } from '../../../store/selectors/characters.selectors';
import { selectRouterState } from '../../../store/selectors/router.selectors';

@Injectable({
    providedIn: 'root'
})
export class CharacterComicsGuard implements Resolve<any> {
    constructor(private store: Store) {}

    public resolve(): Observable<any> {
        let id: number;
        this.store
            .select(selectRouterState)
            .pipe(take(1))
            .subscribe(s => (id = Number(s.state.params['id'])));
        return this.store.select(selectCharacterComics).pipe(
            startWith(undefined),
            withLatestFrom(this.store.select(selectLoadingCharacterComics)),
            filter(([, loading]) => !loading),
            tap(() => {
                this.store.dispatch(
                    getCharacterComics({
                        id
                    })
                );
            }),
            takeWhile(([comics]) => !comics, true)
        );
    }
}
