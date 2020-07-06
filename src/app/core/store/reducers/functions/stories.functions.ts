import { StoriesState } from '../../state/stories.state';

export function appendStories(state: StoriesState, collection: MarvelCollection): Partial<MarvelCollection> {
    const currentStories = state.stories.data.results;
    const data = collection.data;
    const newData: Partial<MarvelCollection> = {
        data: {
            count: data.count,
            limit: data.limit,
            offset: data.offset,
            total: data.total,
            results: currentStories.concat(data.results)
        }
    };

    return newData;
}
