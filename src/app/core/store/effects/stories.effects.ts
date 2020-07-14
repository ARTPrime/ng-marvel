import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { StoriesService } from '../../services/api/stories/stories.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import {
    appendStories,
    appendStoryCharacters,
    appendStoryComics,
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
                filter(([, stories]) => !!stories),
                tap(([, stories]) => this.localStorageService.setItem('Stories', stories))
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

    public appendStories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appendStories),
            switchMap(({ offset }) => this.storiesService.getStories(offset)),
            map(stories => setStories({ stories, append: true }))
        )
    );

    public loadStoryComics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getStoryComics),
            switchMap(({ id, offset }) => this.storiesService.getStoryComics(id, offset)),
            map(storyComics => setStoryComics({ storyComics }))
        )
    );

    public apppendStoryComics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appendStoryComics),
            switchMap(({ id, offset }) => this.storiesService.getStoryComics(id, offset)),
            map(storyComics => setStoryComics({ storyComics, append: true }))
        )
    );

    public loadStoryCharacters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getStoryCharacters),
            switchMap(({ id, offset }) => this.storiesService.getStoryCharcaters(id, offset)),
            map(storyCharacters => setStoryCharacters({ storyCharacters }))
        )
    );

    public appendStoryCharacters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appendStoryCharacters),
            switchMap(({ id, offset }) => this.storiesService.getStoryCharcaters(id, offset)),
            map(storyCharacters => setStoryCharacters({ storyCharacters, append: true }))
        )
    );

    constructor(
        private actions$: Actions,
        private storiesService: StoriesService,
        private store: Store,
        private localStorageService: LocalStorageService
    ) {}
}
