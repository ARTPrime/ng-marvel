import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, tap, withLatestFrom } from 'rxjs/operators';

import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { setSelectedItem } from '../actions/toolbar.actions';
import { selectToolbarState } from '../selectors/toolbar.selectors';

@Injectable()
export class ToolbarEffects {
    public persistSites$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(setSelectedItem),
                withLatestFrom(this.store.select(selectToolbarState)),
                filter(([, toolbar]) => !!toolbar),
                tap(([, toolbar]) => this.localStorageService.setItem('Toolbar', toolbar))
            ),
        {
            dispatch: false
        }
    );

    constructor(private actions$: Actions, private store: Store, private localStorageService: LocalStorageService) {}
}
