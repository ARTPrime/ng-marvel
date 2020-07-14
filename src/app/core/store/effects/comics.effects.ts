import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { ComicsService } from '../../services/api/comics/comics.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import {
    appendComicCharacters,
    appendComics,
    appendComicStories,
    getComic,
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

    public loadComic$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getComic),
            switchMap(({ id }) => this.comicsService.getComic(id)),
            map(comic => setComic({ comic: comic.data.results.pop() as MarvelComic }))
        )
    );

    public loadComics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getComics),
            switchMap(({ offset, filter }) => this.comicsService.getComics(offset, filter)),
            map(comics => setComics({ comics }))
        )
    );

    public appendComics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appendComics),
            switchMap(({ offset, filter }) => this.comicsService.getComics(offset, filter)),
            map(comics => setComics({ comics, append: true }))
        )
    );

    public loadComicsStories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getComicStories),
            switchMap(({ id }) => this.comicsService.getComicStories(id)),
            map(comicStories => setComicStories({ comicStories }))
        )
    );

    public appendComicStories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appendComicStories),
            switchMap(({ offset, id }) => this.comicsService.getComicStories(offset, id)),
            map(comicStories => setComicStories({ comicStories, append: true }))
        )
    );

    public loadComicCharacters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getComicCharacters),
            switchMap(({ id }) => this.comicsService.getComicCharcaters(id)),
            map(comicCharacters => setComicCharacters({ comicCharacters }))
        )
    );

    public appendComicCharacters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appendComicCharacters),
            switchMap(({ offset, id }) => this.comicsService.getComicCharcaters(offset, id)),
            map(comicCharacters => setComicCharacters({ comicCharacters, append: true }))
        )
    );

    constructor(
        private actions$: Actions,
        private comicsService: ComicsService,
        private store: Store,
        private localStorageService: LocalStorageService
    ) {}
}
