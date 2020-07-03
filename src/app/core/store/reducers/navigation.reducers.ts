import { Action, createReducer, on } from '@ngrx/store';

import { navigationToggle } from '../actions/navigation.actions';
import { defaultNavigationState, NavigationState } from '../state/navigation.state';

const reducer = createReducer(
    defaultNavigationState,
    on(navigationToggle, (state: NavigationState) => ({
        ...state,
        isOpen: state.isOpen ? false : true
    }))
);

export function navigationReducer(state: NavigationState, action: Action) {
    return reducer(state, action);
}
