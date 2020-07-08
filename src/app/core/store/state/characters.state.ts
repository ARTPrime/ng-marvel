export interface CharactersState {
    characters: MarvelCollection;
    character: MarvelCharacter;
    characterComics: MarvelCollection;
    characterStories: MarvelCollection;

    loadingCharacters: boolean;
    loadingCharacterComics: boolean;
    loadingCharacterStories: boolean;
}

export const defaultCharacterState: CharactersState = {
    characters: null,
    character: null,
    characterComics: null,
    characterStories: null,

    loadingCharacters: false,
    loadingCharacterComics: false,
    loadingCharacterStories: false
};
