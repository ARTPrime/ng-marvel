export interface StoriesState {
    story: MarvelStory;
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
    story: null,

    loadingStories: false,
    loadingStoryCharacters: false,
    loadingStoryComics: false
};
