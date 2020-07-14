import { Action, createReducer, on } from '@ngrx/store';

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
import { ComicsState, defaultComicsState } from '../state/comics.state';
import { appendComicData } from './functions/comics.functions';

const reducer = createReducer(
    defaultComicsState,
    on(getComic, (state: ComicsState) => ({
        ...state,
        loadingComic: true
    })),
    on(getComics, (state: ComicsState) => ({
        ...state,
        loadingComics: true
    })),
    on(appendComics, (state: ComicsState) => ({
        ...state,
        loadingComics: true
    })),
    on(setComics, (state: ComicsState, { comics, append }) => ({
        ...state,
        comics: append ? { ...state.comics, ...appendComicData(state, comics, 'comics') } : comics,
        loadingComics: false
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
    on(appendComicCharacters, (state: ComicsState) => ({
        ...state,
        loadingComicCharacters: true
    })),
    on(setComicCharacters, (state: ComicsState, { comicCharacters, append }) => ({
        ...state,
        comicCharacters: append
            ? { ...state.comics, ...appendComicData(state, comicCharacters, 'comicCharacters') }
            : comicCharacters,
        loadingComicCharacters: false
    })),
    on(getComicStories, (state: ComicsState) => ({
        ...state,
        loadingComicStories: true
    })),
    on(appendComicStories, (state: ComicsState) => ({
        ...state,
        loadingComicStories: true
    })),
    on(setComicStories, (state: ComicsState, { comicStories, append }) => ({
        ...state,
        comicStories: append
            ? { ...state.comics, ...appendComicData(state, comicStories, 'comicStories') }
            : comicStories,
        loadingComicStories: false
    }))
);

export function comicsReducer(state: ComicsState, action: Action) {
    return reducer(state, action);
}
