import { createAction, props } from '@ngrx/store';

export const getCharacaters = createAction('[Characters] Get');
export const getCharacater = createAction('[Character] Get', props<{ id?: number }>());
export const getCharacterComics = createAction('[Character Comics] Get', props<{ id?: number }>());
export const getCharacterStories = createAction('[Character Stories] Get', props<{ id?: number }>());

export const setCharacaters = createAction('[Characters] Set', props<{ characters: MarvelCollection }>());
export const setCharacater = createAction('[Character] Set', props<{ character: MarvelCollection }>());
export const setCharacterComics = createAction(
    '[Character Comics] Set',
    props<{ characterComics: MarvelCollection }>()
);
export const setCharacterStories = createAction(
    '[Character Stories] Set',
    props<{ characterStories: MarvelCollection }>()
);
