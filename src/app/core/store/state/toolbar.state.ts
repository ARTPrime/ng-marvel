export interface ToolbarState {
    loading?: boolean;
    filterOptions?: UiDropdownItem;
    searchBox?: any;
    selectedItem?: MarvelCharacter | MarvelComic | MarvelStory;
    filterValue: {
        filter: string;
        value: string;
    };
}

export const defaultToolbarState: ToolbarState = {
    loading: false,
    filterOptions: null,
    searchBox: null,
    selectedItem: null,
    filterValue: null
};
