import { Action, createReducer, on } from '@ngrx/store';

import {
    getCharacater,
    getCharacaters,
    getCharacterComics,
    getCharacterStories,
    setCharacater,
    setCharacaters,
    setCharacterComics,
    setCharacterStories
} from '../actions/characters.actions';
import { CharactersState, defaultCharacterState } from '../state/characters.state';
import { appendCharacters } from './functions/characters.functions';

const reducer = createReducer(
    defaultCharacterState,
    on(getCharacaters, (state: CharactersState) => ({
        ...state,
        loadingCharacters: true
    })),
    on(setCharacaters, (state: CharactersState, { characters }) => ({
        ...state,
        characters: state.characters ? { ...state.characters, ...appendCharacters(state, characters) } : characters,
        loadingCharacters: false
    })),
    on(getCharacater, (state: CharactersState) => ({
        ...state,
        loadingCharacter: true
    })),
    on(setCharacater, (state: CharactersState, { character }) => ({
        ...state,
        character,
        loadingCharacter: false
    })),
    on(getCharacterComics, (state: CharactersState) => ({
        ...state,
        loadingCharacterComics: true
    })),
    on(setCharacterComics, (state: CharactersState, { characterComics }) => ({
        ...state,
        characterComics
    })),
    on(getCharacterStories, (state: CharactersState) => ({
        ...state,
        loadingCharacterStories: true
    })),
    on(setCharacterStories, (state: CharactersState, { characterStories }) => ({
        ...state,
        characterStories
    }))
);

export function charactersReducer(state: CharactersState, action: Action) {
    return reducer(state, action);
}
