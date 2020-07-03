import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, takeWhile, tap, withLatestFrom } from 'rxjs/operators';

import { getStories } from '../../store/actions/stories.actions';
import { selectLoadingStories, selectStories } from '../../store/selectors/stories.selectors';

@Injectable({
    providedIn: 'root'
})
export class StoriesLoadGuard implements Resolve<any> {
    constructor(private store: Store<{}>) {}

    public resolve(): Observable<any> {
        return this.store.select(selectStories).pipe(
            withLatestFrom(this.store.select(selectLoadingStories)),
            filter(([, loading]) => !loading),
            tap(([stories]) => {
                if (!stories) {
                    this.store.dispatch(getStories());
                }
            }),
            takeWhile(([stories]) => !stories, true)
        );
    }
}
