import { createAction, props } from '@ngrx/store';

export const getComics = createAction('[Comics] Get', props<{ offset?: number }>());
export const getComicCharacters = createAction('[Comic Characters] Get', props<{ id?: number }>());
export const getComicStories = createAction('[Comic Stories] Get', props<{ id?: number }>());

export const setComics = createAction('[Comics] Set', props<{ comics: MarvelCollection }>());
export const setComic = createAction('[Comic Stories] Set', props<{ comic: MarvelComic }>());
export const setComicCharacters = createAction(
    '[Comics Characater] Set',
    props<{ comicCharacters: MarvelCollection }>()
);
export const setComicStories = createAction('[Comics Stories] Set', props<{ comicStories: MarvelCollection }>());
