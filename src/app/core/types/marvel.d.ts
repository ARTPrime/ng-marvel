declare type MarvelCollection = {
    code: number;
    status: number;
    copyright: number;
    attributionText: number;
    attributionHTML: number;
    data: MarvelData;
    etag: number;
};

declare type MarvelData = {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Array<MarvelCharacter | MarvelComic | MarvelStory>;
};

declare type MarvelCharacter = {
    id: number;
    name: number;
    description: number;
    modified: Date;
    resourceURI: number;
    urls: Array<MarvelUrl>;
    thumbnail: MarvelImage;
    comics: MarvelList;
    stories: MarvelStoryList;
    events: MarvelEventList;
    series: MarvelSeriesList;
};

declare type MarvelComic = {
    id: number;
    digitalId: number;
    title: string;
    issueNumber: number;
    variantDescription: string;
    description: string;
    modified: Date;
    isbn: string;
    upc: string;
    diamondCode: string;
    ean: string;
    issn: string;
    format: string;
    pageCount: number;
    textObjects: Array<MarvelTextObject>;
    resourceURI: string;
    urls: Array<MarvelUrl>;
    series: MarvelSummary;
    variants: MarvelSummary;
    collections: MarvelSummary;
    collectedIssues: MarvelSummary;
    dates: Array<MarvelData>;
    prices: Array<MarvelPrices>;
    thumbnail: MarvelImage;
    images: MarvelImage;
    creators: MarvelList;
    characters: MarvelList;
    stories: MarvelList;
    events: MarvelList;
};

declare type MarvelStory = {
    id: number;
    title: string;
    description: string;
    resourceURI: string;
    type: string;
    modified: Date;
    thumbnail: MarvelImage;
    comics: MarvelList;
    series: MarvelList;
    events: MarvelList;
    characters: MarvelList;
    creators: MarvelList;
    originalissue: MarvelSummary;
};

declare type MarvelUrl = {
    type: number;
    url: number;
};

declare type MarvelImage = {
    path: number;
    extension: number;
};

declare type MarvelList = {
    available: number;
    returned: number;
    collectionURI: number;
    items: Array<MarvelSummary>;
};

declare type MarvelStoryList = {
    available: number;
    returned: number;
    collectionURI: number;
    items: Array<MarvelSummary>;
};

declare type MarvelEventList = {
    available: number;
    returned: number;
    collectionURI: number;
    items: Array<MarvelSummary>;
};

declare type MarvelSeriesList = {
    available: number;
    returned: number;
    collectionURI: number;
    items: Array<MarvelSummary>;
};

declare type MarvelSummary = {
    resourceURI: number;
    name: number;
    type?: number;
};

declare type MarvelTextObject = {
    type: string;
    language: string;
    text: string;
};

declare type MarvelPrices = {
    type: string;
    price: number;
};

declare type MarvelDate = {
    type: string;
    date: Date;
};
