import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { CharactersState } from '../state/characters.state';

export const selectFeature: MemoizedSelector<object, CharactersState> = createFeatureSelector<CharactersState>(
    'characters'
);

export const selectCharacters = createSelector(selectFeature, (state: CharactersState) => state.characters);
export const selectLoadingCharacters = createSelector(
    selectFeature,
    (state: CharactersState) => state.loadingCharacters
);

export const selectCharacter = createSelector(selectFeature, (state: CharactersState) => state.character);
export const selectLoadingCharacter = createSelector(selectFeature, (state: CharactersState) => state.loadingCharacter);

export const selectCharacterComics = createSelector(selectFeature, (state: CharactersState) => state.characterComics);
export const selectLoadingCharacterComics = createSelector(
    selectFeature,
    (state: CharactersState) => state.loadingCharacterComics
);

export const selectCharacterStories = createSelector(selectFeature, (state: CharactersState) => state.characterStories);
export const selectLoadingCharacterStories = createSelector(
    selectFeature,
    (state: CharactersState) => state.loadingCharacterStories
);
