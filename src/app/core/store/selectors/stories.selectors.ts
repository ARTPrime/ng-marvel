import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { StoriesState } from '../state/stories.state';

export const selectStoriesState: MemoizedSelector<object, StoriesState> = createFeatureSelector<StoriesState>(
    'stories'
);

export const selectStories = createSelector(selectStoriesState, (state: StoriesState) => state.stories);
export const selectLoadingStories = createSelector(selectStoriesState, (state: StoriesState) => state.loadingStories);

export const selectStoryCharacters = createSelector(selectStoriesState, (state: StoriesState) => state.storyCharacters);
export const selectLoadingStoryharacters = createSelector(
    selectStoriesState,
    (state: StoriesState) => state.loadingStoryCharacters
);

export const selectStoriesComics = createSelector(selectStoriesState, (state: StoriesState) => state.storyComics);
export const selectLoadingStoriesStories = createSelector(
    selectStoriesState,
    (state: StoriesState) => state.loadingStoryComics
);
