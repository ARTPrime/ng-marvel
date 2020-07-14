import { CharactersState } from '../../state/characters.state';

export function appendCharacterData(
    state: CharactersState,
    collection: MarvelCollection,
    slice: string
): Partial<MarvelCollection> {
    const currentData = state[slice].data.results;
    const data = collection.data;
    const newData: Partial<MarvelCollection> = {
        data: {
            count: data.count + state[slice].data.count,
            limit: data.limit,
            offset: data.offset,
            total: data.total,
            results: currentData.concat(data.results)
        }
    };

    return newData;
}
