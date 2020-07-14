import { StoriesState } from '../../state/stories.state';

export function appendData(
    state: StoriesState,
    collection: MarvelCollection,
    slice: string
): Partial<MarvelCollection> {
    const currentStories = state[slice].data.results;
    const data = collection.data;
    const newData: Partial<MarvelCollection> = {
        data: {
            count: data.count + state[slice].data.count,
            limit: data.limit,
            offset: data.offset,
            total: data.total,
            results: currentStories.concat(data.results)
        }
    };

    return newData;
}
