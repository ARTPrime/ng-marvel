import { createAction, props } from '@ngrx/store';

export const getComic = createAction('[Comics Comic] Get', props<{ id?: number }>());

export const getComics = createAction(
    '[Comics Comics] Get',
    props<{ offset?: number; filter?: { filter: string; value: any } }>()
);
export const appendComics = createAction(
    '[Comics Comics] Append',
    props<{ offset: number; filter?: { filter: string; value: string } }>()
);

export const getComicCharacters = createAction('[Comic Characters] Get', props<{ offset?: number; id?: number }>());
export const appendComicCharacters = createAction(
    '[Comic Characters] Append',
    props<{ offset?: number; id: number }>()
);

export const getComicStories = createAction('[Comic Stories] Get', props<{ offset?: number; id?: number }>());
export const appendComicStories = createAction('[Comic Stories] Append', props<{ offset?: number; id: number }>());

export const setComics = createAction('[Comics Comics] Set', props<{ comics: MarvelCollection; append?: boolean }>());
export const setComic = createAction('[Comics Comic] Set', props<{ comic: MarvelComic }>());
export const setComicCharacters = createAction(
    '[Comics Characaters] Set',
    props<{ comicCharacters: MarvelCollection; append?: boolean }>()
);
export const setComicStories = createAction(
    '[Comics Stories] Set',
    props<{ comicStories: MarvelCollection; append?: boolean }>()
);
