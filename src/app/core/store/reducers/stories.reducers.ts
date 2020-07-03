import { Action, createReducer, on } from '@ngrx/store';

import {
    getStories,
    getStoryCharacters,
    getStoryComics,
    setStories,
    setStoryCharacters,
    setStoryComics
} from '../actions/stories.actions';
import { defaultStoriesState, StoriesState } from '../state/stories.state';

const reducer = createReducer(
    defaultStoriesState,
    on(getStories, (state: StoriesState) => ({
        ...state,
        loadingStories: true
    })),
    on(setStories, (state: StoriesState, { stories }) => ({
        ...state,
        stories,
        loadingStories: false
    })),
    on(getStoryCharacters, (state: StoriesState) => ({
        ...state,
        loadingStoryCharacters: true
    })),
    on(setStoryCharacters, (state: StoriesState, { storyCharacters }) => ({
        ...state,
        storyCharacters,
        loadingStoryCharacters: false
    })),
    on(getStoryComics, (state: StoriesState) => ({
        ...state,
        loadingStoryComics: true
    })),
    on(setStoryComics, (state: StoriesState, { storyComics }) => ({
        ...state,
        storyComics,
        loadingStoryComics: false
    }))
);

export function storiesReducer(state: StoriesState, action: Action) {
    return reducer(state, action);
}
