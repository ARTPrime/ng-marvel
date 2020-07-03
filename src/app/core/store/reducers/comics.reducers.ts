import { Action, createReducer, on } from '@ngrx/store';

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
import { ComicsState, defaultComicsState } from '../state/comics.state';

const reducer = createReducer(
    defaultComicsState,
    on(getComics, (state: ComicsState) => ({
        ...state,
        loadingComics: true
    })),
    on(setComics, (state: ComicsState, { comics }) => ({
        ...state,
        comics,
        loadingComics: false
    })),
    on(getComic, (state: ComicsState) => ({
        ...state,
        loadingComic: true
    })),
    on(setComic, (state: ComicsState, { comic }) => ({
        ...state,
        comic,
        loadingComic: false
    })),
    on(getComicCharacters, (state: ComicsState) => ({
        ...state,
        loadingComicCharacters: true
    })),
    on(setComicCharacters, (state: ComicsState, { comicCharacters }) => ({
        ...state,
        comicCharacters,
        loadingComicCharacters: false
    })),
    on(getComicStories, (state: ComicsState) => ({
        ...state,
        loadingComicStories: true
    })),
    on(setComicStories, (state: ComicsState, { comicStories }) => ({
        ...state,
        comicStories,
        loadingComicStories: false
    }))
);

export function comicsReducer(state: ComicsState, action: Action) {
    return reducer(state, action);
}
