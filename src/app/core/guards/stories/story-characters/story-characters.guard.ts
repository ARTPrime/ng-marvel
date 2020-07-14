import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, startWith, take, takeWhile, tap, withLatestFrom } from 'rxjs/operators';
import { getStoryCharacters } from 'src/app/core/store/actions/stories.actions';
import { selectRouterState } from 'src/app/core/store/selectors/router.selectors';
import { selectLoadingStoryharacters, selectStoryCharacters } from 'src/app/core/store/selectors/stories.selectors';

@Injectable({
    providedIn: 'root'
})
export class StoryCharactersGuard implements Resolve<any> {
    constructor(private store: Store) {}

    public resolve(): Observable<any> {
        let id: number;
        this.store
            .select(selectRouterState)
            .pipe(take(1))
            .subscribe(s => (id = Number(s.state.params['id'])));
        return this.store.select(selectStoryCharacters).pipe(
            startWith(undefined),
            withLatestFrom(this.store.select(selectLoadingStoryharacters)),
            filter(([, loading]) => !loading),
            tap(() => {
                this.store.dispatch(
                    getStoryCharacters({
                        id
                    })
                );
            }),
            takeWhile(([characters]) => !characters, true)
        );
    }
}
