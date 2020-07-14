export interface CharactersState {
    characters: MarvelCollection;
    character: MarvelCharacter;
    characterComics: MarvelCollection;
    characterStories: MarvelCollection;

    loadingCharacter: boolean;
    loadingCharacters: boolean;
    loadingCharacterComics: boolean;
    loadingCharacterStories: boolean;
}

export const defaultCharacterState: CharactersState = {
    characters: null,
    character: null,
    characterComics: null,
    characterStories: null,

    loadingCharacter: false,
    loadingCharacters: false,
    loadingCharacterComics: false,
    loadingCharacterStories: false
};
