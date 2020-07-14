export interface ComicsState {
    comics: MarvelCollection;
    comic: MarvelComic;
    comicCharacters: MarvelCollection;
    comicStories: MarvelCollection;

    loadingComic: boolean;
    loadingComics: boolean;
    loadingComicCharacters: boolean;
    loadingComicStories: boolean;
}

export const defaultComicsState: ComicsState = {
    comics: null,
    comic: null,
    comicCharacters: null,
    comicStories: null,

    loadingComic: false,
    loadingComics: false,
    loadingComicCharacters: false,
    loadingComicStories: false
};
