export interface ComicsState {
    comics: MarvelCollection;
    comic: MarvelCollection;
    comicCharacters: MarvelCollection;
    comicStories: MarvelCollection;

    loadingComics: boolean;
    loadingComic: boolean;
    loadingComicCharacters: boolean;
    loadingComicStories: boolean;
}

export const defaultComicsState: ComicsState = {
    comics: null,
    comic: null,
    comicCharacters: null,
    comicStories: null,

    loadingComics: false,
    loadingComic: false,
    loadingComicCharacters: false,
    loadingComicStories: false
};
