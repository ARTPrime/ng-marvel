export interface ComicsState {
    comics: MarvelCollection;
    comic: MarvelComic;
    comicCharacters: MarvelCollection;
    comicStories: MarvelCollection;

    loadingComics: boolean;
    loadingComicCharacters: boolean;
    loadingComicStories: boolean;
}

export const defaultComicsState: ComicsState = {
    comics: null,
    comic: null,
    comicCharacters: null,
    comicStories: null,

    loadingComics: false,
    loadingComicCharacters: false,
    loadingComicStories: false
};
