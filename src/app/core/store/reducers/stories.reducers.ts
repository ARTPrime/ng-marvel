import { Action, createReducer, on } from '@ngrx/store';

import {
    appendStories,
    appendStoryCharacters,
    appendStoryComics,
    getStories,
    getStoryCharacters,
    getStoryComics,
    setStories,
    setStory,
    setStoryCharacters,
    setStoryComics
} from '../actions/stories.actions';
import { defaultStoriesState, StoriesState } from '../state/stories.state';
import { appendData } from './functions/stories.functions';

const reducer = createReducer(
    defaultStoriesState,
    on(setStory, (state: StoriesState, { story }) => ({
        ...state,
        story,
        loadingStories: false
    })),
    on(getStories, (state: StoriesState) => ({
        ...state,
        loadingStories: true
    })),
    on(appendStories, (state: StoriesState) => ({
        ...state,
        loadingStories: true
    })),
    on(setStories, (state: StoriesState, { stories, append }) => ({
        ...state,
        stories: append ? { ...state.stories, ...appendData(state, stories, 'stories') } : stories,
        loadingStories: false
    })),
    on(getStoryCharacters, (state: StoriesState) => ({
        ...state,
        loadingStoryCharacters: true
    })),
    on(appendStoryCharacters, (state: StoriesState) => ({
        ...state,
        loadingStoryCharacters: true
    })),
    on(setStoryCharacters, (state: StoriesState, { storyCharacters, append }) => ({
        ...state,
        storyCharacters: append
            ? { ...state.storyCharacters, ...appendData(state, storyCharacters, 'storyCharacters') }
            : storyCharacters,
        loadingStoryCharacters: false
    })),
    on(getStoryComics, (state: StoriesState) => ({
        ...state,
        loadingStoryComics: true
    })),
    on(appendStoryComics, (state: StoriesState) => ({
        ...state,
        loadingStoryComics: true
    })),
    on(setStoryComics, (state: StoriesState, { storyComics, append }) => ({
        ...state,
        storyComics: append ? { ...state.storyComics, ...appendData(state, storyComics, 'storyComics') } : storyComics,
        loadingStoryComics: false
    }))
);

export function storiesReducer(state: StoriesState, action: Action) {
    return reducer(state, action);
}
