import { CharactersState } from '../../state/characters.state';

export function appendCharacters(state: CharactersState, collection: MarvelCollection): Partial<MarvelCollection> {
    const currentCharacters = state.characters.data.results;
    const data = collection.data;
    const newData: Partial<MarvelCollection> = {
        data: {
            count: data.count,
            limit: data.limit,
            offset: data.offset,
            total: data.total,
            results: currentCharacters.concat(data.results)
        }
    };

    return newData;
}
