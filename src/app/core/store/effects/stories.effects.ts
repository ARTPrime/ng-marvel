import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { StoriesService } from '../../services/api/stories/stories.service';
import {
    getStories,
    getStoryCharacters,
    getStoryComics,
    setStories,
    setStoryCharacters,
    setStoryComics
} from '../actions/stories.actions';

@Injectable()
export class StoriesEffects {
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

    constructor(private actions$: Actions, private storiesService: StoriesService) {}
}
