import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { ComicsService } from '../../services/api/comics/comics.service';
import {
    getComic,
    getComicCharacters,
    getComics,
    getComicStories,
    setComic,
    setComicCharacters,
    setComics,
    setComicStories
} from '../actions/comics.actions';

@Injectable()
export class ComicsEffects {
    public loadComics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getComics),
            switchMap(({ offset }) => this.comicsService.getComics(offset)),
            map(comics => setComics({ comics }))
        )
    );

    public loadComic$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getComic),
            switchMap(({ id }) => this.comicsService.getComic(id)),
            map(comic => setComic({ comic }))
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

    constructor(private actions$: Actions, private comicsService: ComicsService) {}
}
