import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take, takeWhile, tap, withLatestFrom } from 'rxjs/operators';
import { getComic } from 'src/app/core/store/actions/comics.actions';
import { selectComic, selectLoadingComic } from 'src/app/core/store/selectors/comics.selectors';
import { selectRouterState } from 'src/app/core/store/selectors/router.selectors';

@Injectable({
    providedIn: 'root'
})
export class ComicSetGuard implements Resolve<any> {
    constructor(private store: Store) {}

    public resolve(): Observable<any> {
        let id: number;
        this.store
            .select(selectRouterState)
            .pipe(take(1))
            .subscribe(s => (id = Number(s.state.params['id'])));
        return this.store.select(selectComic).pipe(
            withLatestFrom(this.store.select(selectLoadingComic)),
            filter(([_, loading]) => !loading),
            tap(([_, comic]) => {
                if (!comic) {
                    this.store.dispatch(
                        getComic({
                            id
                        })
                    );
                }
            }),
            takeWhile(([comic]) => !comic, true)
        );
    }
}
