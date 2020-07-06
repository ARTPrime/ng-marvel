import { ComicsState } from '../../state/comics.state';

export function appendComics(state: ComicsState, collection: MarvelCollection): Partial<MarvelCollection> {
    const currentComics = state.comics.data.results;
    const data = collection.data;
    const newData: Partial<MarvelCollection> = {
        data: {
            count: data.count,
            limit: data.limit,
            offset: data.offset,
            total: data.total,
            results: currentComics.concat(data.results)
        }
    };

    return newData;
}
