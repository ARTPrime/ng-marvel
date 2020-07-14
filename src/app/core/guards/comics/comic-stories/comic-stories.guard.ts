import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, startWith, take, takeWhile, tap, withLatestFrom } from 'rxjs/operators';
import { getComicStories } from 'src/app/core/store/actions/comics.actions';
import { selectComicsStories, selectLoadingComicStories } from 'src/app/core/store/selectors/comics.selectors';
import { selectRouterState } from 'src/app/core/store/selectors/router.selectors';

@Injectable({
    providedIn: 'root'
})
export class ComicStoriesGuard implements Resolve<any> {
    constructor(private store: Store) {}

    public resolve(): Observable<any> {
        let id: number;
        this.store
            .select(selectRouterState)
            .pipe(take(1))
            .subscribe(s => (id = Number(s.state.params['id'])));
        return this.store.select(selectComicsStories).pipe(
            startWith(undefined),
            withLatestFrom(this.store.select(selectLoadingComicStories)),
            filter(([, loading]) => !loading),
            tap(() => {
                this.store.dispatch(
                    getComicStories({
                        id
                    })
                );
            }),
            takeWhile(([stories]) => !stories, true)
        );
    }
}
