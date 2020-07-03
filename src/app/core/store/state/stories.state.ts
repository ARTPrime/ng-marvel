export interface StoriesState {
    stories: MarvelCollection;
    storyComics: MarvelCollection;
    storyCharacters: MarvelCollection;

    loadingStories: boolean;
    loadingStoryCharacters: boolean;
    loadingStoryComics: boolean;
}

export const defaultStoriesState: StoriesState = {
    stories: null,
    storyComics: null,
    storyCharacters: null,

    loadingStories: false,
    loadingStoryCharacters: false,
    loadingStoryComics: false
};
