import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { AppState } from '../state/app.state';

export function initStateFromLocalStorage(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return (state, action): AppState => {
        const newState = reducer(state, action);
        if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
            return { ...newState, ...LocalStorageService.loadInitialState() };
        }
        return newState;
    };
}
