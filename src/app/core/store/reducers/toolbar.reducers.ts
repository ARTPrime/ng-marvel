import { Action, createReducer, on } from '@ngrx/store';

import { setFilterOptions, setSelectedFilter, setSelectedItem, toolbarLoading } from '../actions/toolbar.actions';
import { defaultToolbarState, ToolbarState } from '../state/toolbar.state';

const reducer = createReducer(
    defaultToolbarState,
    on(toolbarLoading, (state: ToolbarState, { loading }) => ({
        ...state,
        loading
    })),
    on(setSelectedItem, (state: ToolbarState, { item }) => ({
        ...state,
        selectedItem: item
    })),
    on(setFilterOptions, (state: ToolbarState, { filterOptions }) => ({
        ...state,
        filterOptions
    })),
    on(setSelectedFilter, (state: ToolbarState, { filter }) => ({
        ...state,
        filterValue: { ...filter }
    }))
);

export function toolbarReducer(state: ToolbarState, action: Action) {
    return reducer(state, action);
}
