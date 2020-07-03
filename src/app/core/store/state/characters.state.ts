export interface CharactersState {
    characters: MarvelCollection;
    character: MarvelCollection;
    characterComics: MarvelCollection;
    characterStories: MarvelCollection;

    loadingCharacters: boolean;
    loadingCharacter: boolean;
    loadingCharacterComics: boolean;
    loadingCharacterStories: boolean;
}

export const defaultCharacterState: CharactersState = {
    characters: null,
    character: null,
    characterComics: null,
    characterStories: null,

    loadingCharacters: false,
    loadingCharacter: false,
    loadingCharacterComics: false,
    loadingCharacterStories: false
};
