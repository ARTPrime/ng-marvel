import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, takeWhile, tap, withLatestFrom } from 'rxjs/operators';

import { getComics } from '../../store/actions/comics.actions';
import { selectComics, selectLoadingComics } from '../../store/selectors/comics.selectors';

@Injectable({
    providedIn: 'root'
})
export class ComicsLoadGuard implements Resolve<any> {
    constructor(private store: Store) {}

    public resolve(): Observable<any> {
        return this.store.select(selectComics).pipe(
            withLatestFrom(this.store.select(selectLoadingComics)),
            filter(([, loading]) => !loading),
            tap(([comics]) => {
                if (!comics) {
                    this.store.dispatch(getComics({ offset: 0 }));
                }
            }),
            takeWhile(([comics]) => !comics, true)
        );
    }
}
