export const DRXAVIER = '97a87b23c5ce77b3168f202ff3300d8ea6f5f39b';
export const MAGNETO = '1d6e8a796e64a15f59094589ebac0673';

const BASE = 'https://gateway.marvel.com';

export const ENDPOINTS = {
    characters: `${BASE}/v1/public/characters`,
    character: (id: number) => `${BASE}/v1/public/characters/${id}`,
    characterComics: (id: number) => `${BASE}/v1/public/characters/${id}/comics`,
    characterStories: (id: number) => `${BASE}/v1/public/characters/${id}/stories`,

    comics: `${BASE}/v1/public/comics`,
    comic: (id: number) => `${BASE}/v1/public/comics/${id}`,
    comicCharacters: (id: number) => `${BASE}/v1/public/comics/${id}/characters`,
    comicStories: (id: number) => `${BASE}/v1/public/comics/${id}/stories`,

    stories: `${BASE}/v1/public/stories`,
    storyCharacters: (id: number) => `${BASE}/v1/public/stories/${id}/characters`,
    storyComics: (id: number) => `${BASE}/v1/public/stories/${id}/comics`
};
