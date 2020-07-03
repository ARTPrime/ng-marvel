import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { NavigationState } from '../state/navigation.state';

export const selectFeature: MemoizedSelector<object, NavigationState> = createFeatureSelector<NavigationState>(
    'navigation'
);

export const selectIdOpen = createSelector(selectFeature, (state: NavigationState) => state.isOpen);
