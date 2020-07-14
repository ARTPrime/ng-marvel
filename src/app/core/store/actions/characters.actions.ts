import { createAction, props } from '@ngrx/store';

export const getCharacater = createAction('[Characters] Get Character', props<{ id: number }>());

export const getCharacaters = createAction(
    '[Characters] Get Characters',
    props<{ offset: number; filter?: { filter: string; value: string } }>()
);
export const appendCharacters = createAction(
    '[Characters] Append Characters',
    props<{ offset: number; filter?: { filter: string; value: string } }>()
);

export const getCharacterComics = createAction('[Character Comics] Get', props<{ offset?: number; id?: number }>());
export const appendCharacterComics = createAction(
    '[Characters] Append Character Comics',
    props<{ id: number; offset: number }>()
);

export const getCharacterStories = createAction('[Character Stories] Get', props<{ offset?: number; id?: number }>());
export const appendCharacterStories = createAction(
    '[Characters] Append Character Stories',
    props<{ id: number; offset: number }>()
);

export const setCharacaters = createAction(
    '[Characters] Set',
    props<{ characters: MarvelCollection; append?: boolean }>()
);

export const setCharacater = createAction('[Character] Set', props<{ character: MarvelCharacter }>());
export const setCharacterComics = createAction(
    '[Character Comics] Set',
    props<{ characterComics: MarvelCollection; append?: boolean }>()
);
export const setCharacterStories = createAction(
    '[Character Stories] Set',
    props<{ characterStories: MarvelCollection; append?: boolean }>()
);
