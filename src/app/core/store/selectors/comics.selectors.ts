import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { ComicsState } from '../state/comics.state';

export const selectComicsState: MemoizedSelector<object, ComicsState> = createFeatureSelector<ComicsState>('comics');

export const selectComics = createSelector(selectComicsState, (state: ComicsState) => state.comics);
export const selectLoadingComics = createSelector(selectComicsState, (state: ComicsState) => state.loadingComics);

export const selectComicCharacters = createSelector(selectComicsState, (state: ComicsState) => state.comicCharacters);
export const selectLoadingComicharacters = createSelector(
    selectComicsState,
    (state: ComicsState) => state.loadingComicCharacters
);

export const selectComicsStories = createSelector(selectComicsState, (state: ComicsState) => state.comicStories);
export const selectLoadingComicStories = createSelector(
    selectComicsState,
    (state: ComicsState) => state.loadingComicStories
);

export const selectComic = createSelector(selectComicsState, (state: ComicsState) => state.comic);
export const selectLoadingComic = createSelector(selectComicsState, (state: ComicsState) => state.loadingComic);
