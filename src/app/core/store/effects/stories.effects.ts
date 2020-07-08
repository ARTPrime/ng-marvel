import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { StoriesService } from '../../services/api/stories/stories.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import {
    getStories,
    getStoryCharacters,
    getStoryComics,
    setStories,
    setStoryCharacters,
    setStoryComics
} from '../actions/stories.actions';
import { selectStoriesState } from '../selectors/stories.selectors';

@Injectable()
export class StoriesEffects {
    public persistSites$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(setStoryComics, setStoryCharacters, setStories),
                withLatestFrom(this.store.select(selectStoriesState)),
                filter(([, comics]) => !!comics),
                tap(([, comics]) => this.localStorageService.setItem('Comics', comics))
            ),
        {
            dispatch: false
        }
    );

    public loadStories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getStories),
            switchMap(({ offset }) => this.storiesService.getStories(offset)),
            map(stories => setStories({ stories }))
        )
    );

    public loadStoryComics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getStoryComics),
            switchMap(({ id }) => this.storiesService.getStoryComics(id)),
            map(storyComics => setStoryComics({ storyComics }))
        )
    );

    public loadStoryCharacters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getStoryCharacters),
            switchMap(({ id }) => this.storiesService.getStoryCharcaters(id)),
            map(storyCharacters => setStoryCharacters({ storyCharacters }))
        )
    );

    constructor(
        private actions$: Actions,
        private storiesService: StoriesService,
        private store: Store,
        private localStorageService: LocalStorageService
    ) {}
}
