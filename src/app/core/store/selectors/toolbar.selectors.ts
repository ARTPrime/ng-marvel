import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { ToolbarState } from '../state/toolbar.state';

export const selectToolbarState: MemoizedSelector<object, ToolbarState> = createFeatureSelector<ToolbarState>(
    'toolbar'
);

export const selectItem = createSelector(selectToolbarState, (state: ToolbarState) => state.selectedItem);
export const selectFilterOptions = createSelector(selectToolbarState, (state: ToolbarState) => state.filterOptions);
export const selectFilter = createSelector(selectToolbarState, (state: ToolbarState) => state.filterValue);
