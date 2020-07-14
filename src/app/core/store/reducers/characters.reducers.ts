import { Action, createReducer, on } from '@ngrx/store';

import {
    appendCharacterComics,
    appendCharacters,
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
import { appendCharacterData } from './functions/characters.functions';

const reducer = createReducer(
    defaultCharacterState,
    on(getCharacaters, (state: CharactersState) => ({
        ...state,
        loadingCharacters: true
    })),
    on(getCharacater, (state: CharactersState) => ({
        ...state,
        loadingCharacter: true
    })),
    on(appendCharacters, (state: CharactersState) => ({
        ...state,
        loadingCharacters: true
    })),
    on(setCharacaters, (state: CharactersState, { characters, append }) => ({
        ...state,
        characters: append
            ? { ...state.characters, ...appendCharacterData(state, characters, 'characters') }
            : characters,
        loadingCharacters: false
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
    on(appendCharacterComics, (state: CharactersState) => ({
        ...state,
        loadingCharacterComics: true
    })),
    on(setCharacterComics, (state: CharactersState, { characterComics, append }) => ({
        ...state,
        characterComics: append
            ? { ...state.characterComics, ...appendCharacterData(state, characterComics, 'characterComics') }
            : characterComics,
        loadingCharacterComics: false
    })),
    on(getCharacterStories, (state: CharactersState) => ({
        ...state,
        loadingCharacterStories: true
    })),
    on(setCharacterStories, (state: CharactersState, { characterStories, append }) => ({
        ...state,
        characterStories: append
            ? { ...state.characterComics, ...appendCharacterData(state, characterStories, 'characterStories') }
            : characterStories,
        loadingCharacterStories: false
    }))
);

export function charactersReducer(state: CharactersState, action: Action) {
    return reducer(state, action);
}
