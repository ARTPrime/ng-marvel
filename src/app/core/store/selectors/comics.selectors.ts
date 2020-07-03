import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { ComicsState } from '../state/comics.state';

export const selectFeature: MemoizedSelector<object, ComicsState> = createFeatureSelector<ComicsState>('comics');

export const selectComics = createSelector(selectFeature, (state: ComicsState) => state.comics);
export const selectLoadingComics = createSelector(selectFeature, (state: ComicsState) => state.loadingComics);

export const selectComicCharacters = createSelector(selectFeature, (state: ComicsState) => state.comicCharacters);
export const selectLoadingComicharacters = createSelector(
    selectFeature,
    (state: ComicsState) => state.loadingComicCharacters
);

export const selectComicsStories = createSelector(selectFeature, (state: ComicsState) => state.comicStories);
export const selectLoadingComicsStories = createSelector(
    selectFeature,
    (state: ComicsState) => state.loadingComicStories
);

export const selectComic = createSelector(selectFeature, (state: ComicsState) => state.comic);
export const selectLoadingComic = createSelector(selectFeature, (state: ComicsState) => state.loadingComic);
