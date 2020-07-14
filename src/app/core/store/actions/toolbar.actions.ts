import { createAction, props } from '@ngrx/store';

export const toolbarLoading = createAction('[Toolbar Component] Show Loader', props<{ loading?: boolean }>());
export const setSelectedItem = createAction(
    '[Toolbar Component] Set Selected Item',
    props<{ item?: MarvelComic | MarvelCharacter | MarvelStory }>()
);
export const setFilterOptions = createAction(
    '[Toolbar Component] Set FilterOptions',
    props<{ filterOptions?: UiDropdownItem }>()
);
export const setSelectedFilter = createAction(
    '[Toolbar Component] Set Filter',
    props<{ filter?: { filter: string; value: string } }>()
);
