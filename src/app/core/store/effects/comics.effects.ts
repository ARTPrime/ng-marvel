import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { ComicsService } from '../../services/api/comics/comics.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import {
    getComicCharacters,
    getComics,
    getComicStories,
    setComic,
    setComicCharacters,
    setComics,
    setComicStories
} from '../actions/comics.actions';
import { selectComicsState } from '../selectors/comics.selectors';

@Injectable()
export class ComicsEffects {
    public persistSites$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(setComic, setComics, setComicCharacters, setComicStories),
                withLatestFrom(this.store.select(selectComicsState)),
                filter(([, comics]) => !!comics),
                tap(([, comics]) => this.localStorageService.setItem('Comics', comics))
            ),
        {
            dispatch: false
        }
    );

    public loadComics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getComics),
            switchMap(({ offset }) => this.comicsService.getComics(offset)),
            map(comics => setComics({ comics }))
        )
    );

    public loadComicsStories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getComicStories),
            switchMap(({ id }) => this.comicsService.getComicStories(id)),
            map(comicStories => setComicStories({ comicStories }))
        )
    );

    public loadComicCharacters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getComicCharacters),
            switchMap(({ id }) => this.comicsService.getComicCharcaters(id)),
            map(comicCharacters => setComicCharacters({ comicCharacters }))
        )
    );

    constructor(
        private actions$: Actions,
        private comicsService: ComicsService,
        private store: Store,
        private localStorageService: LocalStorageService
    ) {}
}
