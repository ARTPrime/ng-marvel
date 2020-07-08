import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { CharactersState } from '../state/characters.state';

export const selectCharactersState: MemoizedSelector<object, CharactersState> = createFeatureSelector<CharactersState>(
    'characters'
);

export const selectCharacters = createSelector(selectCharactersState, (state: CharactersState) => state.characters);
export const selectLoadingCharacters = createSelector(
    selectCharactersState,
    (state: CharactersState) => state.loadingCharacters
);

export const selectCharacter = createSelector(selectCharactersState, (state: CharactersState) => state.character);

export const selectCharacterComics = createSelector(
    selectCharactersState,
    (state: CharactersState) => state.characterComics
);
export const selectLoadingCharacterComics = createSelector(
    selectCharactersState,
    (state: CharactersState) => state.loadingCharacterComics
);

export const selectCharacterStories = createSelector(
    selectCharactersState,
    (state: CharactersState) => state.characterStories
);
export const selectLoadingCharacterStories = createSelector(
    selectCharactersState,
    (state: CharactersState) => state.loadingCharacterStories
);
