import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { NavigationState } from '../state/navigation.state';

export const selectFeature: MemoizedSelector<object, NavigationState> = createFeatureSelector<NavigationState>(
    'navigation'
);

export const selectIsOpen = createSelector(selectFeature, (state: NavigationState) => state.isOpen);
export const selectNavItems = createSelector(selectFeature, (state: NavigationState) => state.navItems);
