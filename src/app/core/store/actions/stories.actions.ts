import { createAction, props } from '@ngrx/store';

export const setStory = createAction('[Stories Story] Get', props<{ story: MarvelStory }>());

export const getStories = createAction(
    '[Stories Stories] Get',
    props<{ offset: number; filter?: { filter: string; value: string } }>()
);
export const appendStories = createAction(
    '[Stories Stories] Append',
    props<{ offset: number; filter?: { filter: string; value: string } }>()
);

export const getStoryComics = createAction('[Story Comics] Get', props<{ offset?: number; id?: number }>());
export const appendStoryComics = createAction('[Story Comics] Append', props<{ offset?: number; id?: number }>());

export const getStoryCharacters = createAction('[Story Characters] Get', props<{ offset?: number; id?: number }>());
export const appendStoryCharacters = createAction(
    '[Story Characters] Append',
    props<{ offset?: number; id?: number }>()
);

export const setStories = createAction('[Stories] Set', props<{ stories: MarvelCollection; append?: boolean }>());
export const setStoryCharacters = createAction(
    '[Story Characaters] Set',
    props<{ storyCharacters: MarvelCollection; append?: boolean }>()
);
export const setStoryComics = createAction(
    '[Story Comics] Set',
    props<{ storyComics: MarvelCollection; append?: boolean }>()
);
