import { createAction, props } from '@ngrx/store';

export const getStories = createAction('[Stories] Get');
export const getStoryComics = createAction('[Story Comics] Get', props<{ id?: number }>());
export const getStoryCharacters = createAction('[Story Characters] Get', props<{ id?: number }>());

export const setStories = createAction('[Stories] Set', props<{ stories: MarvelCollection }>());
export const setStoryCharacters = createAction(
    '[Story Characaters] Set',
    props<{ storyCharacters: MarvelCollection }>()
);
export const setStoryComics = createAction('[Story Comics] Set', props<{ storyComics: MarvelCollection }>());
