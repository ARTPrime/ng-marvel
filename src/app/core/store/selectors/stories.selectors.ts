import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { StoriesState } from '../state/stories.state';

export const selectFeature: MemoizedSelector<object, StoriesState> = createFeatureSelector<StoriesState>('stories');

export const selectStories = createSelector(selectFeature, (state: StoriesState) => state.stories);
export const selectLoadingStories = createSelector(selectFeature, (state: StoriesState) => state.loadingStories);

export const selectStoryCharacters = createSelector(selectFeature, (state: StoriesState) => state.storyCharacters);
export const selectLoadingStoryharacters = createSelector(
    selectFeature,
    (state: StoriesState) => state.loadingStoryCharacters
);

export const selectStoriesComics = createSelector(selectFeature, (state: StoriesState) => state.storyComics);
export const selectLoadingStoriesStories = createSelector(
    selectFeature,
    (state: StoriesState) => state.loadingStoryComics
);
